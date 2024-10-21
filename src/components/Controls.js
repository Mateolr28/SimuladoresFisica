import React from 'react';

const Controls = ({ angle, setAngle, velocity, setVelocity, mass, setMass, diameter, setDiameter }) => {
  return (
    <div className="controls">
      <div>
        <label>Ángulo (°):</label>
        <input
          type="range"
          min="25"
          max="90"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
        <span>{angle}°</span>
      </div>

      <div>
        <label>Velocidad (m/s):</label>
        <input
          type="range"
          min="1"
          max="30"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
        />
        <span>{velocity} m/s</span>
      </div>

      <div>
        <label>Masa (kg):</label>
        <input
          type="range"
          min="1"
          max="30"
          step="0.01"
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
        />
        <span>{mass} kg</span>
      </div>

      <div>
        <label>Diámetro (m):</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={diameter}
          onChange={(e) => setDiameter(Number(e.target.value))}
        />
        <span>{diameter} m</span>
      </div>
    </div>
  );
};

export default Controls;
