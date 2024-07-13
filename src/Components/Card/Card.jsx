import React, { useState } from 'react';
import './Card.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import EditCardModal from '../../Components/Modal/EditCardModal';


import usoletVarConst from '../../assets/usoletVarConst.jpg';
import queEsJs from '../../assets/queEsJs.jpg';
import equipofrontEnd from '../../assets/equipofrontEnd.jpg';
import simplificandoCodigo from '../../assets/simplificandoCodigo.jpg';
import sqlynosql from '../../assets/sqlynosql.jpg';
import SpringFramework from '../../assets/SpringFramework.jpg';
import sorfSkills from '../../assets/sorfSkills.jpg';
import las7softs from '../../assets/las7softs.jpg';
import metodologiasAgiles from '../../assets/metodologiasAgiles.jpg';


export const images = {
  'usoletVarConst.jpg': usoletVarConst,
  'queEsJs.jpg': queEsJs,
  'equipofrontEnd.jpg': equipofrontEnd,
  'simplificandoCodigo.jpg': simplificandoCodigo,
  'sqlynosql.jpg': sqlynosql,
  'SpringFramework.jpg': SpringFramework,
  'sorfSkills.jpg': sorfSkills,
  'las7softs.jpg': las7softs,
  'metodologiasAgiles.jpg': metodologiasAgiles,
};

const defaultImage = 'path_to_default_image.jpg';
const Card = ({ video, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = (formData) => {
    const updatedVideo = {
      ...video,
      ...formData,
      nombre: formData.nombre,
      imagen: formData.imagen,
      equipo: formData.equipo,
      enlace: formData.enlace,
      descripcion: formData.descripcion
    };

    fetch(`http://localhost:3000/videos/${video.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVideo),
    })
    .then(response => response.json())
    .then(data => {
      onUpdate(data);
      handleCloseModal();
    })
    .catch(error => console.error('Error updating video:', error));
  };

 
  const imageName = video.imagen ? video.imagen.split('/').pop() : defaultImage;
  const imageUrl = images[imageName] || defaultImage;
  return (
    <div className="card" style={{ borderColor: video.color }}>
      <img
        className="card-image"
        src={imageUrl}
        alt={video.nombre}
        onClick={() => window.open(video.enlace, '_blank')}
      />
      <div className="card-content">
        <h3 className="card-title">{video.nombre}</h3>
        <p className="card-description">{video.descripcion}</p>
        <div className="card-footer">
          <BsPencilSquare className="icon" onClick={handleShowModal} />
          <BsTrash className="icon" onClick={() => onDelete(video.id)} />
        </div>
      </div>
      <EditCardModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveModal}
        video={video}
      />
    </div>
  );
};

export default Card;