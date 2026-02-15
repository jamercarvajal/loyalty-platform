import { db } from './firebase-config.js';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const RESTAURANT_ID = 'demo_restaurant_001';

// Cargar estadísticas
export async function loadStats() {
    try {
        const qrQuery = query(collection(db, 'qr_codes'), where('restaurantId', '==', RESTAURANT_ID));
        const qrSnapshot = await getDocs(qrQuery);
        document.getElementById('qrCount').textContent = qrSnapshot.size;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const gamesQuery = query(
            collection(db, 'games_played'), 
            where('restaurantId', '==', RESTAURANT_ID),
            where('timestamp', '>=', Timestamp.fromDate(today))
        );
        const gamesSnapshot = await getDocs(gamesQuery);
        document.getElementById('gamesCount').textContent = gamesSnapshot.size;
        document.getElementById('prizesCount').textContent = gamesSnapshot.size;
    } catch (error) {
        console.error('Error cargando estadísticas:', error);
    }
}

// Generar QR
export async function generateQR() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Generando...';

    try {
        const uniqueCode = 'QR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        const docRef = await addDoc(collection(db, 'qr_codes'), {
            code: uniqueCode,
            restaurantId: RESTAURANT_ID,
            usado: false,
            fechaCreacion: Timestamp.now(),
            fechaUso: null
        });

        console.log('✅ QR guardado:', docRef.id);
        displayQR(uniqueCode);
        loadStats();

        btn.disabled = false;
        btn.textContent = '✨ Generar Nuevo QR Code';
    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error: ' + error.message);
        btn.disabled = false;
        btn.textContent = '✨ Generar Nuevo QR Code';
    }
}

// Mostrar QR
function displayQR(code) {
    const qrDisplay = document.getElementById('qrDisplay');
    const canvas = document.getElementById('qrCanvas');
    canvas.innerHTML = '';
    
    const gameUrl = `${window.location.origin}/games/dice.html?qr=${code}`;
    
    new QRCode(canvas, {
        text: gameUrl,
        width: 300,
        height: 300,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('qrCodeText').textContent = code;
    qrDisplay.classList.add('active');
    window.currentQRCode = code;
    window.currentQRUrl = gameUrl;
}

// Descargar QR
export function downloadQR() {
    const canvas = document.querySelector('#qrCanvas canvas');
    const link = document.createElement('a');
    link.download = `QR-${window.currentQRCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Imprimir QR
export function printQR() {
    const canvas = document.querySelector('#qrCanvas canvas');
    const win = window.open('');
    win.document.write(`
        <html>
        <head><title>Imprimir QR</title></head>
        <body style="text-align: center; padding: 50px;">
            <h2>🎮 Loyalty Platform</h2>
            <p>Código: ${window.currentQRCode}</p>
            <img src="${canvas.toDataURL()}" style="max-width: 400px;">
            <p style="margin-top: 20px;">Escanea para jugar y ganar premios</p>
        </body>
        </html>
    `);
    setTimeout(() => {
        win.print();
        win.close();
    }, 500);
}