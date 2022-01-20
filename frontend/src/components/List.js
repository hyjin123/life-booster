import axios from "axios";
import { React, useState } from "react";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";
import "./List.css";

export default function List(props) {
  // state for the add task popup
  const [show, setShow] = useState(false);

  // handling the open and close of the add task pop up
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // handles when a user adds a task
  const handleAdd = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("task-name"));
    axios
      .post("/task", {
        taskName: data.get("task-name"),
        taskDetail: data.get("task-detail"),
      })
      .then((res) => {
        console.log(res.data);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  // props
  const { date, months, weekdays, setListOn } = props;

  // when a user clicks the back button, it renders and brings back the calendar
  const handleClick = () => {
    setListOn(false);
  };

  return (
    <div>
      <h1>
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()},{" "}
        {weekdays[date.getDay()]}
      </h1>
      <h3>
        <button onClick={handleClick}>Go Back to the Calendar</button>
      </h3>
      <h3>
        <button onClick={handleShow}>Add a Task</button>
      </h3>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="All Tasks"></Tab>
        <Tab eventKey="uncompleted" title="Uncompleted"></Tab>
        <Tab eventKey="progress" title="In-progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your task below:</Modal.Body>
        <Form className="add-task-form" onSubmit={handleAdd}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="task-name"
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDetail">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              name="task-detail"
              placeholder="Details"
              rows={3}
            />
          </Form.Group>
          <Form.Select aria-label="Default select example">
            <option>Status</option>
            <option value="not-completed">Not Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="High Priority" />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
              Save Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
