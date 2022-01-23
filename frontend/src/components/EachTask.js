import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export default function EachTask(props) {
  // hooks
  const [deleteShow, setDeleteShow] = useState(false);

  // destructure props
  const {
    id,
    type,
    name,
    description,
    status,
  } = props;

  // handles popup events, open and close
  const handleClose = () => setDeleteShow(false);
  const handleShow = () => setDeleteShow(true);

  // when the user deletes a task
  const handleDelete = () => {
    // close the popup
    setDeleteShow(false);
    // make a post axios request to remove the selected (1) task from the database
    axios.post("/task/delete", {
      id
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
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
        show={deleteShow}
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
