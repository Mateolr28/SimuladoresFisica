import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MainPage.css';

function MainPage() {
  return (
    <div className="MainPage">
      <h1>Simuladores de Física</h1>
      <div className="simulators">
        <Link to="/proyectil" className="simulator-link">
          Simulador de Movimiento de Proyectil
        </Link>
        <Link to="/caida-libre" className="simulator-link">
          Simulador de Caída Libre
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
