import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import '../css/FreeFallChart.css'; // Asegúrate de importar el archivo CSS

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, Tooltip, Legend);

const FreeFallChart = ({ timeData, heightData, velocityData }) => {
  const dataHeight = {
    labels: timeData,
    datasets: [
      {
        label: 'Altura (m)',
        data: heightData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const dataVelocity = {
    labels: timeData,
    datasets: [
      {
        label: 'Velocidad (m/s)',
        data: velocityData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="chart-wrapper">
        <div className="chart-container">
          <h2>Gráfico de Altura</h2>
          <Line 
              data={dataHeight} 
              options={{ 
              maintainAspectRatio: false, 
              responsive: true,
              }} />
        </div>

        <div className="chart-container">
          <h2>Gráfico de Velocidad</h2>
          <Line data={dataVelocity} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default FreeFallChart;
