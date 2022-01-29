import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faUtensils,
  faRunning,
  faUser,
  faBriefcase,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

export default function EachTask(props) {
  // hooks
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [taskType, setTaskType] = useState(props.type);
  const [taskName, setTaskName] = useState(props.name);
  const [taskDescription, setTaskDescription] = useState(props.description);
  const [taskStatus, setTaskStatus] = useState(props.status);

  // destructure props
  const {
    id,
    type,
    name,
    description,
    status,
    setDeletedTask,
    editedTask,
    setEditedTask,
  } = props;

  // capitalize type and status
  const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
  const capitalStatus = status.charAt(0).toUpperCase() + status.slice(1);

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

  // when the user deletes a task, make an axios request to the backend to delete from database
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

  // when the user edits a task, make an axios request to backend to update the database
  const handleEdit = (event) => {
    event.preventDefault();
    // close the popup
    setEditShow(false);
    // make a post axios request
    axios
      .post("task/edit", {
        id,
        taskType,
        taskName,
        taskDescription,
        taskStatus,
      })
      .then((res) => {
        console.log(res.data);
        // set state to the new name so that the page re-renders
        setEditedTask((editedTask) => editedTask + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-row">
      <div className="table-type">
        {type === "general" && <FontAwesomeIcon icon={faTasks} />}
        {type === "errand" && <FontAwesomeIcon icon={faShoppingCart} />}
        {type === "household-chore" && <FontAwesomeIcon icon={faHome} />}
        {type === "meal" && <FontAwesomeIcon icon={faUtensils} />}
        {type === "leisure" && <FontAwesomeIcon icon={faRunning} />}
        {type === "personal" && <FontAwesomeIcon icon={faUser} />}
        {type === "work" && <FontAwesomeIcon icon={faBriefcase} />}
        <div>{capitalType}</div>
      </div>
      <div
        className={`table-status ${
          status === "not-completed" && "not-completed"
        } ${status === "in-progress" && "in-progress"} ${
          status === "completed" && "completed"
        }`}
      >
        {capitalStatus}
      </div>
      <div>{name}</div>
      <div className="table-description">{description}</div>
      <div className="button-div">
        <button className="edit-button" onClick={handleEditShow}>
          Edit
        </button>
      </div>
      <div className="button-div">
        <button className="delete-button" onClick={handleDeleteShow}>
          Delete
        </button>
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
          <Modal.Title className="delete-title">
            Are you sure you want to delete this task?
          </Modal.Title>
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
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDetail">
            <Form.Label>Enter Details</Form.Label>
            <Form.Control
              as="textarea"
              name="task-detail"
              placeholder="Details"
              rows={3}
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingSelect"
            label="Type"
            className="edit-type"
          >
            <Form.Select
              value={taskType}
              onChange={(event) => setTaskType(event.target.value)}
              name="task-type"
              aria-label="Type"
            >
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
            <Form.Select
              className="edit-status"
              value={taskStatus}
              onChange={(event) => setTaskStatus(event.target.value)}
              name="task-status"
              aria-label="Default select example"
            >
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
            <Button variant="primary" onClick={handleEdit} type="submit">
              Save Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
