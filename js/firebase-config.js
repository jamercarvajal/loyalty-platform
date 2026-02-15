// Importar Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBM126_pM0q_zRb6wziXkGdfkKnI4rz8rj8",
  authDomain: "plataforma-de-fidelizacion.firebaseapp.com",
  projectId: "plataforma-de-fidelizacion",
  storageBucket: "plataforma-de-fidelizacion.firebasestorage.googleapis.com",
  messagingSenderId: "321898960008",
  appId: "1:321898960008:web:ccb87400f4876fob54fb3d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar para usar en otros archivos
export { app, db };ss