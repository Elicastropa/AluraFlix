import React, { useState, useEffect } from 'react';
import './Categorias.css';
import equipos from '../../Components/Equipos/Equipos'; 
import Video from '../../Components/Video/Video';

const Categorias = () => {
  const [equiposData, setEquiposData] = useState([]);

  useEffect(() => {
    setEquiposData(equipos);
  }, []);

  return (
    <div className="categorias">
      {equiposData.map((equipo) => (
 
        <div key={equipo.nombre} className="equipo" style={{ backgroundColor: equipo.color }}>
          <h2>{equipo.nombre}</h2>
          <Video equipoNombre={equipo.nombre} color={equipo.color} />
        </div>
      ))}
    </div>
  );
};

export default Categorias;

