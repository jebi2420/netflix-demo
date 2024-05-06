import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MovieModal.css'

function MovieModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='modal-container'>
      <Button variant="primary" onClick={handleShow}>
        Tralier
      </Button>

      <Modal className='modal-background' show={show} onHide={handleClose}>
        <Modal.Header className='modal-head' closeButton>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      </Modal>
    </div>
  );
}

export default MovieModal;