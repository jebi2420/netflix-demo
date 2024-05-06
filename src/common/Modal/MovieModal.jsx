import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MovieVideo from '../MovieVideo/MovieVideo';
import './MovieModal.css'

function MovieModal({video}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log('vedio data:', video)

  return (
    <div className='modal-container'>
      <Button variant="primary" onClick={handleShow}>
        Tralier
      </Button>

      <Modal className='modal-background' show={show} onHide={handleClose}>
        <Modal.Header className='modal-head' closeButton>
        </Modal.Header>
        <Modal.Body><MovieVideo video={video}></MovieVideo></Modal.Body>
      </Modal>
    </div>
  );
}

export default MovieModal;