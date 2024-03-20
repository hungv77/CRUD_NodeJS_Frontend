import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete This User ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user ? : {props.dataModal.email}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            CONFIRM !!!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
} 

export default ModalDelete;