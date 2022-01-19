import { React, useState } from "react";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";
import "./List.css"

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
        <Form className="add-task-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Form>
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
}
