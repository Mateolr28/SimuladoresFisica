import React from 'react';
import FreeFallCanvas from '../components/FreeFallCanvas'; // Componente del simulador de caída libre
import '../css/CaidaLibreSimulator.css';

function CaidaLibreSimulator() {
  return (
    <div className="simulator-page">
      <h1>Simulador de Caída Libre</h1>
      <FreeFallCanvas />
    </div>
  );
}

export default CaidaLibreSimulator;
