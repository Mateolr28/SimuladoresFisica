import React from 'react';
import ProjectileCanvas from '../components/ProjectileSimulator'; // Componente del simulador
import '../css/ProjectileSimulator.css';

function ProyectilSimulator() {
  return (
    <div className="simulator-page">
      <h1>Simulador de Movimiento de Proyectil</h1>
      <ProjectileCanvas />
    </div>
  );
}

export default ProyectilSimulator;
