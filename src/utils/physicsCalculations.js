export const calculateProjectileMotion = (angle, velocity, height = 0) => {
    const g = 9.81; // Gravedad (m/s²)
    const angleInRadians = (angle * Math.PI) / 180;
  
    // Tiempo para alcanzar el punto más alto
    const timeToMaxHeight = velocity * Math.sin(angleInRadians) / g;
  
    // Altura máxima alcanzada
    const maxHeight = height + (Math.pow(velocity * Math.sin(angleInRadians), 2)) / (2 * g);
  
    // Tiempo de vuelo total considerando altura inicial
    const totalFlightTime = timeToMaxHeight + Math.sqrt(2 * (maxHeight) / g);
  
    // Distancia horizontal total (x = v * t * cos(θ))
    const maxDistance = velocity * Math.cos(angleInRadians) * totalFlightTime;
  
    return { timeToMaxHeight, maxHeight, totalFlightTime, maxDistance };
  };
  