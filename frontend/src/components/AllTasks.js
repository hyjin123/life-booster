import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function AllTasks(props) {
  // hooks for all tasks
  const [allTasks, setAllTasks] = useState([]);
  const [show, setShow] = useState(false);

  // props
  const { date, userId, addedTask, setDeletedTask } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // when the user deletes a task
  const handleDelete = () => {
    console.log("hello");
    // make a post axios request to remove the task from the database
  };

  // map through all the tasks
  const listItems = allTasks.map((task) => {
    return (
      <div className="table-row">
        <div>{task.type}</div>
        <div>{task.name}</div>
        <div>{task.description}</div>
        <div>{task.status}</div>
        <div>
          <button>Edit</button>
        </div>
        <div>
          <button onClick={handleShow}>Delete</button>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="delete-popup"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  });
  // make a backend request to retrieve all the tasks for the chosen date
  useEffect(() => {
    axios
      .get(`/task/all`, {
        params: {
          date: date,
          userId: userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, [addedTask]);

  return (
    <div className="table-container">
      <div className="table-header">
        <div>Type</div>
        <div>Name</div>
        <div>Details</div>
        <div>Status</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      {listItems}
    </div>
  );
}
