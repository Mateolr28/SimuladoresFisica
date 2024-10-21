import React, { useState, useRef, useEffect } from 'react';
import { calculateProjectileMotion } from '../utils/physicsCalculations';
import '../css/ProjectileSimulator.css';

const ProjectileSimulator = () => {
  const [angle, setAngle] = useState(45);  // Ángulo inicial
  const [velocity, setVelocity] = useState(50);  // Velocidad inicial
  const [height, setHeight] = useState(0);  // Altura inicial
  const [results, setResults] = useState(null);  // Resultados de los cálculos
  const canvasRef = useRef(null);  // Referencia al canvas

  // Recalcular los resultados cada vez que el ángulo o la velocidad cambien
  useEffect(() => {
    const calcResults = calculateProjectileMotion(angle, velocity, height);
    setResults(calcResults);
  }, [angle, velocity, height]);

  // Dibuja el proyectil y el cañón en el canvas
  const drawProjectile = (ctx, t) => {
    const g = 9.81;  // Gravedad
    const angleInRadians = (angle * Math.PI) / 180;  // Convertir ángulo a radianes

    // Coordenadas del proyectil
    const x = velocity * t * Math.cos(angleInRadians);
    const y = height + (velocity * t * Math.sin(angleInRadians)) - (0.5 * g * t * t);

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Dibujar el cañón
    const cannonLength = 50;
    const cannonX = 50;
    const cannonY = ctx.canvas.height - 50;

    ctx.save();
    ctx.translate(cannonX, cannonY);  // Trasladar al punto de origen del cañón
    ctx.rotate(-angleInRadians);  // Rotar el cañón según el ángulo
    ctx.fillStyle = 'black';
    ctx.fillRect(0, -5, cannonLength, 10);  // Dibujar el cañón
    ctx.restore();

    // Dibujar el proyectil (bola) desde la punta del cañón
    ctx.beginPath();
    ctx.arc(cannonX + cannonLength * Math.cos(-angleInRadians), cannonY + cannonLength * Math.sin(-angleInRadians), 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  };

  // Animar el proyectil
  const animateProjectile = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const interval = setInterval(() => {
      drawProjectile(ctx, t);
      t += 0.1;
      if (t > results.totalFlightTime) clearInterval(interval);  // Detener animación después del vuelo
    }, 100);
  };

  return (
    <div className="simulator-container">
      <h1>Projectile Motion Simulator with Cannon</h1>

      <div className="controls">
        <div className="input-group">
          <label>Angle (degrees):</label>
          <input
            type="range"
            min="25"
            max="90"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
          <span>{angle}°</span>
        </div>

        <div className="input-group">
          <label>Initial Velocity (m/s):</label>
          <input
            type="range"
            min="0"
            max="30"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
          />
          <span>{velocity} m/s</span>
        </div>

        <div className="input-group">
          <label>Initial Height (m):</label>
          <input
            type="range"
            min="0"
            max="50"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <span>{height} m</span>
        </div>
      </div>

      <button onClick={animateProjectile}>Start Simulation</button>

      <canvas ref={canvasRef} width={600} height={400} className="canvas"></canvas>

      {results && (
        <div className="results">
          <p>Time of Flight: {results.totalFlightTime.toFixed(2)} s</p>
          <p>Maximum Height: {results.maxHeight.toFixed(2)} m</p>
          <p>Maximum Distance: {results.maxDistance.toFixed(2)} m</p>
        </div>
      )}
    </div>
  );
};

export default ProjectileSimulator;
