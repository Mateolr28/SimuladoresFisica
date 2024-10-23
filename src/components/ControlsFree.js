import React from 'react';

const ControlsFree = ({ height, setHeight }) => {
  return (
    <div>
      <label htmlFor="height">Altura inicial (metros): {height}</label>
      <input
        id="height"
        type="range"
        min="1"
        max="50" // Limitar a 50 metros
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
    </div>
  );
};

export default ControlsFree;
