import React from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot
import App from './App'; // Cambia esto según tu estructura de archivos

const container = document.getElementById('root'); // Asegúrate de que este ID coincida con tu archivo HTML
const root = createRoot(container); // Crear la raíz
root.render(<App />); // Renderizar la aplicación
