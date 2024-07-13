import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import equipos from '../../Components/Equipos/Equipos';
import {images} from '../Card/Card';
import './EditCardModal.css';

const EditCardModal = ({ show, handleClose, handleSave, video }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    equipo: '',
    imagen: '',
    enlace: '',
    descripcion: '',
  });

  useEffect(() => {
    if (video) {
      setFormData({
        id: video.id || '',
        nombre: video.nombre || '',
        equipo: video.equipo || '',
        imagen: video.imagen || '',
        enlace: video.enlace || '',
        descripcion: video.descripcion || '',
      });
    }
  }, [show, video]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('que trae el formulario', JSON.stringify(formData, null, 2))
    fetch(`http://localhost:3000/videos/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedVideo => {
        handleSave(updatedVideo);
        handleClose();
      })
      .catch(error => console.error('Error updating video:', error));
  };

  return (
    <>
      {show && <div className="custom-overlay"></div>}
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header>
          <Modal.Title className="titleCard">Editar Video</Modal.Title>
          <Button variant="light" onClick={handleClose} className="close-buttonCard">
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitulo" className="form-group">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa el título"
              />
            </Form.Group>

            <Form.Group controlId="formCategoria" className="form-group">
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                as="select"
                name="equipo"
                value={formData.equipo}
                onChange={handleChange}
                aria-label="Selecciona un equipo"
              >
                <option>Selecciona un equipo...</option>
                {equipos.map((equipo, index) => (
                  <option key={index} value={equipo.nombre}>
                    {equipo.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImagen" className="form-group">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="URL de la imagen"
              />
            </Form.Group>

            <Form.Group controlId="formEnlace" className="form-group">
              <Form.Label>Enlace</Form.Label>
              <Form.Control
                type="text"
                name="enlace"
                value={formData.enlace}
                onChange={handleChange}
                placeholder="URL del video"
              />
            </Form.Group>

            <Form.Group controlId="formDescripcion" className="form-group">
              <Form.Label>Descripción333</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Breve descripción de tu video"
                rows={10}
                style={{ height: '200px' }} 

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCardModal;