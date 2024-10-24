import React, { useEffect, useRef, useState } from 'react';

function Canvas({ angle, velocity, isAnimating, setSimulationData }) {
  const canvasRef = useRef(null);
  const [pathPoints, setPathPoints] = useState([]); // Lista para almacenar los puntos de la trayectoria

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajustar el tamaño del canvas según el contenedor
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth; // Tomar el ancho del contenedor
      canvas.height = canvas.parentElement.offsetHeight * 0.5; // Proporción 50% de la altura del contenedor
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Ajustar al inicio

    const drawBackground = () => {
      // Dibujar el cielo
      ctx.fillStyle = '#87CEEB';  // Color de cielo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar el suelo
      ctx.fillStyle = '#32CD32';  // Color verde para el suelo
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    };

    const drawCannon = (currentAngle) => {
      ctx.save();
      ctx.translate(50, canvas.height - 50);
      ctx.rotate((-currentAngle * Math.PI) / 180);
      ctx.fillStyle = 'red';
      ctx.fillRect(0, -10, 40, 20);
      ctx.restore();
    };

    const drawProjectile = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.stroke();
    };

    const drawPath = (points) => {
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      for (let i = 0; i < points.length - 1; i++) {
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
      }
      ctx.stroke();
    };

    const animateProjectile = () => {
      let x = 0;
      let y = canvas.height - 50;
      const g = 9.81;
      const radians = (angle * Math.PI) / 180;
      const vx = velocity * Math.cos(radians);
      const vy = velocity * Math.sin(radians);
      let t = 0;
      const dt = 0.05;

      const points = [];

      const interval = setInterval(() => {
        t += dt;
        x = 50 + vx * t * 10;
        y = canvas.height - 50 - (vy * t - 0.5 * g * t * t) * 10;

        points.push({ x, y });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawCannon(angle);
        drawPath(points);
        drawProjectile(x, y);

        if (y >= canvas.height - 50) {
          clearInterval(interval);
          setPathPoints(points);
          setSimulationData({
            totalTime: t.toFixed(2),
            horizontalDistance: (x / 10).toFixed(2),
            maxHeight: ((vy * vy) / (2 * g)).toFixed(2),
          });
        }
      }, 20);
    };

    drawBackground();
    drawCannon(angle);

    if (isAnimating) {
      animateProjectile();
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [angle, velocity, isAnimating, setSimulationData]);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
  );
}

export default Canvas;
