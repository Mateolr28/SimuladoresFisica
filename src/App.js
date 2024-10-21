import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProyectilSimulator from './pages/ProyectilSimulator';
import CaidaLibreSimulator from './pages/CaidaLibreSimulator';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import './App.css';

function ProyectilSimulatorPage() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(30);
  const [mass, setMass] = useState(10);
  const [diameter, setDiameter] = useState(0.5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [simulationData, setSimulationData] = useState({
    totalTime: 0,
    horizontalDistance: 0,
    maxHeight: 0,
  });

  const startSimulation = () => {
    setIsAnimating(true);
  };

  const resetSimulation = () => {
    setAngle(45);
    setVelocity(30);
    setMass(10);
    setDiameter(0.5);
    setIsAnimating(false);
    setSimulationData({
      totalTime: 0,
      horizontalDistance: 0,
      maxHeight: 0,
    });
  };

  return (
    <div className="App">
      <h1>Simulador de Proyectil</h1>
      <Canvas
        angle={angle}
        velocity={velocity}
        height={0}
        isAnimating={isAnimating}
        setSimulationData={setSimulationData}
      />
      <Controls
        angle={angle}
        setAngle={setAngle}
        velocity={velocity}
        setVelocity={setVelocity}
        mass={mass}
        setMass={setMass}
        diameter={diameter}
        setDiameter={setDiameter}
      />
      <div className="buttons">
        <button onClick={startSimulation}>Iniciar Simulación</button>
        <button onClick={resetSimulation}>Reiniciar Simulación</button>
      </div>

      <div className="results">
        <h2>Resultados de la Simulación</h2>
        <p>Tiempo total de vuelo: {simulationData.totalTime} s</p>
        <p>Distancia horizontal: {simulationData.horizontalDistance} m</p>
        <p>Altura máxima: {simulationData.maxHeight} m</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/proyectil" element={<ProyectilSimulatorPage />} />
        <Route path="/caida-libre" element={<CaidaLibreSimulator />} />
      </Routes>
    </Router>
  );
}

export default App;
