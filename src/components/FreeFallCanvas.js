import React, { useEffect, useRef } from 'react';

const FreeFallCanvas = ({ height, time, maxHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width = window.innerWidth < 768 ? window.innerWidth * 0.9 : 500;
   const canvasHeight = canvas.height = window.innerWidth < 768 ? window.innerWidth * 0.9 : 500; 
    const g = 9.81;

    // Ecuación de la caída libre para calcular la altura
    const objectHeight = height - 0.5 * g * time * time; // Altura real en metros en función del tiempo
    const yPosition = canvasHeight - (objectHeight / maxHeight) * canvasHeight; // Mapeo al canvas

    // Asegurar que la pelota no pase del suelo (canvasHeight)
    const finalYPosition = Math.min(yPosition, canvasHeight - 20);

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la bola
    ctx.beginPath();
    ctx.arc(canvas.width / 2, finalYPosition, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }, [height, time, maxHeight]);

  return <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />;
};



export default FreeFallCanvas;
