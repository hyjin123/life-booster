import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";

export default function EachTask(props) {
  // hooks
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  // destructure props
  const { id, type, name, description, status, setDeletedTask } = props;

  // handles popup events, open and close
  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteShow = () => {
    setDeleteShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
  };

  const handleEditShow = () => {
    setEditShow(true);
  };

  // when the user deletes a task
  const handleDelete = () => {
    // close the popup
    setDeleteShow(false);
    // make a post axios request to remove the selected (1) task from the database, send the task id as a body
    axios
      .post("/task/delete", {
        id,
      })
      .then((res) => {
        // set deletedTask hook to the id so that the all task table re-renders whenever user deletes a task
        setDeletedTask(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    console.log("hello")
  };

  return (
    <div className="table-row">
      <div>{type}</div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{status}</div>
      <div>
        <button onClick={handleEditShow}>Edit</button>
      </div>
      <div>
        <button onClick={handleDeleteShow}>Delete</button>
      </div>
      <Modal
        show={deleteShow}
        onHide={handleDeleteClose}
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
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit your task below:</Modal.Body>
        <Form className="add-task-form" onSubmit={handleEdit}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              name="task-name"
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDetail">
            <Form.Label>Enter Details</Form.Label>
            <Form.Control
              as="textarea"
              name="task-detail"
              placeholder="Details"
              rows={3}
            />
          </Form.Group>
          <FloatingLabel controlId="floatingSelect" label="Type">
            <Form.Select name="task-type" aria-label="Type">
              <option value="general">General</option>
              <option value="errand">Errand</option>
              <option value="household-chore">Household Chore</option>
              <option value="meal">Meal</option>
              <option value="leisure">Leisure</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Status">
            <Form.Select name="task-status" aria-label="Default select example">
              <option value="not-completed">Not Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              name="task-priority"
              type="checkbox"
              label="High Priority"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditClose} type="submit">
              Save Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
