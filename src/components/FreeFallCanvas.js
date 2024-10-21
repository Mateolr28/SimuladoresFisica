// src/components/FreeFallCanvas.js

import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

// Registrar escalas y otros elementos necesarios
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend);

const FreeFallCanvas = () => {
    const canvasRef = useRef(null);
    const [height, setHeight] = useState(100); // altura inicial en metros
    const [mass, setMass] = useState(1); // masa del objeto en kg
    const [isFalling, setIsFalling] = useState(false);
    const [time, setTime] = useState(0);
    const [distances, setDistances] = useState([]);
    const [velocities, setVelocities] = useState([]);
    const gravity = 9.81; // gravedad en m/s²
    const airResistanceCoefficient = 0.1; // coeficiente de resistencia del aire

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleMassChange = (e) => {
        setMass(e.target.value);
    };

    const startFalling = () => {
        setIsFalling(true);
        setTime(0);
        setDistances([]); // Reiniciar datos
        setVelocities([]); // Reiniciar datos
    };

    const stopFalling = () => {
        setIsFalling(false);
    };

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (isFalling) {
            // Calcula la fuerza de resistencia del aire
            const airResistance = airResistanceCoefficient * Math.pow(time, 2);
            const netForce = mass * gravity - airResistance; // Fuerza neta

            // Calcula la aceleración
            const acceleration = netForce / mass;
            const distanceFallen = 0.5 * acceleration * Math.pow(time, 2);
            const currentHeight = height - distanceFallen;

            // Guardar datos para gráficos
            setDistances(prev => [...prev, currentHeight]);
            setVelocities(prev => [...prev, acceleration * time]);

            // Si el objeto ha llegado al suelo
            if (currentHeight <= 0) {
                setIsFalling(false);
                return;
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(50, canvas.height - currentHeight, 30, 30); // Dibuja el objeto (un cuadrado)
            setTime((prev) => prev + 0.1); // Aumenta el tiempo
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current; // Aquí se obtiene correctamente la referencia al canvas
        const ctx = canvas.getContext('2d');
        const interval = setInterval(() => {
            draw(ctx); // Llama a la función draw con el contexto correcto
        }, 100); // Redibuja cada 100 ms

        return () => clearInterval(interval);
    }, [isFalling, time, height, mass]);

    // Datos para los gráficos
    const dataDistance = {
        labels: distances.map((_, index) => (index * 0.1).toFixed(1)), // Tiempo en segundos
        datasets: [
            {
                label: 'Altura (m)',
                data: distances.map(distance => distance > 0 ? distance : 0), // No permitir valores negativos
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    const dataVelocity = {
        labels: velocities.map((_, index) => (index * 0.1).toFixed(1)), // Tiempo en segundos
        datasets: [
            {
                label: 'Velocidad (m/s)',
                data: velocities,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center', background: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#333' }}>Simulador de Caída Libre</h1>
            <input 
                type="number" 
                value={height} 
                onChange={handleHeightChange} 
                placeholder="Altura inicial (m)"
                style={inputStyle}
            />
            <input 
                type="number" 
                value={mass} 
                onChange={handleMassChange} 
                placeholder="Masa del objeto (kg)"
                style={inputStyle}
            />
            <div>
                <button onClick={startFalling} style={buttonStyle}>Iniciar Caída</button>
                <button onClick={stopFalling} style={buttonStyle}>Detener Caída</button>
            </div>
            <canvas ref={canvasRef} width={400} height={600} style={{ border: '1px solid black', marginTop: '20px', background: '#fff' }} />
            <div>
                <h3 style={{ color: '#555' }}>Gráfica de Altura</h3>
                <Line data={dataDistance} />
                <h3 style={{ color: '#555' }}>Gráfica de Velocidad</h3>
                <Line data={dataVelocity} />
                <p style={{ color: '#333' }}>Tiempo de caída: {time.toFixed(1)} s</p>
            </div>
        </div>
    );
};

// Estilos para los botones y entradas
const buttonStyle = {
    margin: '10px',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const inputStyle = {
    margin: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '150px',
};

export default FreeFallCanvas;
