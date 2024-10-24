import React, { useState, useEffect } from 'react';
import FreeFallCanvas from '../components/FreeFallCanvas';
import ControlsFree from '../components/ControlsFree';
import FreeFallChart from '../components/FreeFallChart';
import '../css/CaidaLibreSimulator.css'; // Importa el archivo CSS

const CaidaLibreSimulator = () => {
  const [height, setHeight] = useState(25); // Altura inicial por defecto
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Estado para el control de la simulación
  const [hasLanded, setHasLanded] = useState(false); // Estado para saber si ha aterrizado
  const [timeData, setTimeData] = useState([]); // Datos para la gráfica
  const [heightData, setHeightData] = useState([]); // Datos para la gráfica
  const [velocityData, setVelocityData] = useState([]); // Datos para la gráfica
  const maxHeight = 50; // Altura máxima (50 metros)
  const g = 9.81; // Gravedad en m/s²

  // Calcula la velocidad final
  const calculateFinalVelocity = (time) => {
    return g * time;
  };

  useEffect(() => {
    let interval;
    if (isRunning && !hasLanded) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const fallTime = Math.sqrt((2 * height) / g);
          if (prevTime >= fallTime) {
            clearInterval(interval);
            setIsRunning(false);
            setHasLanded(true);
            return fallTime;
          }

          const currentHeight = height - 0.5 * g * prevTime * prevTime;
          const currentVelocity = calculateFinalVelocity(prevTime);

          setTimeData((prevData) => [...prevData, prevTime]);
          setHeightData((prevData) => [...prevData, currentHeight]);
          setVelocityData((prevData) => [...prevData, currentVelocity]);

          return prevTime + 0.05;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, height, hasLanded]);

  const startSimulation = () => {
    setIsRunning(true);
    setTime(0);
    setHasLanded(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setHasLanded(false);
    setTimeData([]);
    setHeightData([]);
    setVelocityData([]);
  };

  return (
    <div className="container">
      <h1>Simulador de Caída Libre</h1>
      <ControlsFree height={height} setHeight={setHeight} />
      <FreeFallCanvas height={height} time={time} maxHeight={maxHeight} />
      <div>
        <p>Tiempo de caída: {time.toFixed(2)} s</p>
        <p>Velocidad final: {calculateFinalVelocity(time).toFixed(2)} m/s</p>
      </div>
      <div className="button-container">
        <button onClick={startSimulation} disabled={isRunning || hasLanded}>Iniciar</button>
        <button onClick={resetSimulation}>Reiniciar</button>
      </div>
      <FreeFallChart timeData={timeData} heightData={heightData} velocityData={velocityData} />
    </div>
  );
};

export default CaidaLibreSimulator;
