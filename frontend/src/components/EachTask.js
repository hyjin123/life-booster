import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export default function EachTask(props) {
  // destructure props
  const {
    key,
    type,
    name,
    description,
    status,
    handleShow,
    handleClose,
    show,
    setShow,
  } = props;

  // when the user deletes a task
  const handleDelete = () => {
    console.log("hello");
    // close the popup
    setShow(false);
    // make a post axios request to remove the task from the database
  };
  
  return (
    <div className="table-row">
      <div>{type}</div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{status}</div>
      <div>
        <button>Edit</button>
      </div>
      <div>
        <button onClick={handleShow}>Delete</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation={false}
        className="delete-popup"
        dialogClassName="custom-dialog"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this task?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
