import React, { useEffect, useRef, useState } from 'react';

function Canvas({ angle, velocity, isAnimating, setSimulationData }) {
  const canvasRef = useRef(null);
  const [pathPoints, setPathPoints] = useState([]); // Lista para almacenar los puntos de la trayectoria

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawBackground = () => {
      // Dibujar el cielo
      ctx.fillStyle = '#87CEEB';  // Color de cielo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar el suelo
      ctx.fillStyle = '#32CD32';  // Color verde para el suelo
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    };

    const drawCannon = (currentAngle) => {
      // Dibujar el cañón
      ctx.save();
      ctx.translate(50, canvas.height - 50);
      ctx.rotate((-currentAngle * Math.PI) / 180); // Rotar el cañón según el ángulo
      ctx.fillStyle = 'red';// color del cañon
      ctx.fillRect(0, -10, 40, 20);
      ctx.restore();
    };

    const drawProjectile = (x, y) => {
      // Dibujar la pelota del proyectil
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'red'; //color de la pelota
      ctx.fill();
      ctx.stroke();
    };

    const drawPath = (points) => {
      // Dibujar la línea parabólica conectando los puntos
      ctx.beginPath();
      ctx.strokeStyle = 'blue'; //Color de la linea
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
      const g = 9.81; // Gravedad en m/s²
      const radians = (angle * Math.PI) / 180; // Convertir grados a radianes
      const vx = velocity * Math.cos(radians); // Componente x de la velocidad
      const vy = velocity * Math.sin(radians); // Componente y de la velocidad

      let t = 0;
      const dt = 0.05; // Intervalo de tiempo para la simulación

      const points = []; // Lista para almacenar los puntos de la trayectoria

      const interval = setInterval(() => {
        t += dt;
        x = 50 + vx * t * 10; // Multiplicar por 10 para escalar
        y = canvas.height - 50 - (vy * t - 0.5 * g * t * t) * 10; // Escalar y revertir para la altura

        points.push({ x, y }); // Almacenar el punto de la trayectoria

        // Limpiar el canvas y redibujar todo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawCannon(angle);
        drawPath(points); // Dibujar la trayectoria
        drawProjectile(x, y);

        // Detener la animación cuando el proyectil cae al suelo
        if (y >= canvas.height - 50) {
          clearInterval(interval);
          setPathPoints(points); // Almacenar los puntos para la trayectoria final
          setSimulationData({
            totalTime: t.toFixed(2),
            horizontalDistance: (x / 10).toFixed(2),
            maxHeight: ((vy * vy) / (2 * g)).toFixed(2), // Altura máxima alcanzada
          });
        }
      }, 20);
    };

    drawBackground();
    drawCannon(angle);

    if (isAnimating) {
      animateProjectile();
    }

  }, [angle, velocity, isAnimating, setSimulationData]);

  return (
    <canvas ref={canvasRef} width={1500} height={500} />
  );
}

export default Canvas;
