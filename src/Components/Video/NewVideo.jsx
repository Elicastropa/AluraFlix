/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import equipos from '../Equipos/Equipos';
import './NewVideoModal.css';

export const NewVideoModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    equipo: '',
    imagen: '',
    enlace: '',
    descripcion: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      handleClear();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      equipo: '',
      imagen: '',
      enlace: '',
      descripcion: '',
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El título es requerido.';
    if (!formData.equipo) newErrors.equipo = 'El equipo es requerido.';
    if (!formData.imagen) newErrors.imagen = 'La imagen es requerida.';
    if (!formData.enlace)
      newErrors.enlace = 'El enlace del video es requerido.';
    return newErrors;
  };

  function toggleSavedData() {
    const currentValue = localStorage.getItem('SavedData');
    const newBooleanValue = !(currentValue === 'true');
    localStorage.setItem('SavedData', newBooleanValue.toString());
  }

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Datos a guardar:', formData);
      const response = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el video.');
      }
      console.log('Video guardado correctamente.');
      toggleSavedData();
      handleClose();
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  return (
    <>
      {show && <div className='custom-overlay'></div>}
      <Modal show={show} onHide={handleClose} className='custom-modalVideo'>
        <Modal.Header>
          <Modal.Title className='title'>Agregar Nuevo Video</Modal.Title>
          <Button
            variant='light'
            onClick={handleClose}
            className='close-buttonCard'
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formNombre' className='form-group'>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type='text'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                placeholder='Ingresa el título'
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formEquipo' className='form-group'>
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                as='select'
                name='equipo'
                value={formData.equipo}
                onChange={handleChange}
                aria-label='Selecciona un equipo'
                isInvalid={!!errors.equipo}
              >
                <option value=''>Selecciona un equipo...</option>
                {equipos.map((equipo, index) => (
                  <option key={index} value={equipo.nombre}>
                    {equipo.nombre}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.equipo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formImagen' className='form-group'>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type='text'
                name='imagen'
                value={formData.imagen}
                onChange={handleChange}
                placeholder='URL de la imagen'
                isInvalid={!!errors.imagen}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.imagen}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formEnlace' className='form-group'>
              <Form.Label>Video</Form.Label>
              <Form.Control
                type='text'
                name='enlace'
                value={formData.enlace}
                onChange={handleChange}
                placeholder='URL del video'
                isInvalid={!!errors.enlace}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.enlace}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formDescripcion' className='form-group'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as='textarea'
                name='descripcion'
                value={formData.descripcion}
                onChange={handleChange}
                placeholder='Breve descripción de tu video'
                rows={3}
                style={{ height: '200px' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='btn-secondaryCard'
            onClick={handleClear}
          >
            Limpiar
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewVideoModal;
