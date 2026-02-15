import { db } from './firebase-config.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Probar conexión a Firebase
async function testFirebase() {
    try {
        console.log('🔥 Probando conexión a Firebase...');
        
        // Intentar crear un documento de prueba
        const docRef = await addDoc(collection(db, "test"), {
            mensaje: "Conexión exitosa!",
            timestamp: new Date()
        });
        
        console.log('✅ Firebase funciona! ID del documento:', docRef.id);
        alert('✅ Firebase conectado correctamente!');
    } catch (error) {
        console.error('❌ Error conectando a Firebase:', error);
        alert('❌ Error: ' + error.message);
    }
}

// Exportar para usar
export { testFirebase };
