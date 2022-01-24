import axios from "axios";
import { React, useState } from "react";
import {
  Tabs,
  Tab,
  Modal,
  Button,
  Form,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import "./List.css";
import AllTasks from "./AllTasks";
import UncompletedTasks from "./UncompletedTasks";
import InProgressTasks from "./InProgressTasks";
import CompletedTasks from "./CompletedTasks";

export default function List(props) {
  // state that allows the all task list to re-render if this changes (whenever new task is added)
  const [addedTask, setAddedTask] = useState(0);
  const [deletedTask, setDeletedTask] = useState(0);
  const [editedTask, setEditedTask] = useState("");

  // props
  const { show, setShow } = props;

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
    axios
      .post("/task", {
        userId: props.userId,
        date: props.date,
        taskName: data.get("task-name"),
        taskDetail: data.get("task-detail"),
        taskType: data.get("task-type"),
        taskStatus: data.get("task-status"),
        taskPriority: data.get("task-priority"),
      })
      .then((res) => {
        // set addedTask hook to the id so that the all task table re-renders whenever user adds a task
        setAddedTask(res.data.id);
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
    <div className="task-container">
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
        <Tab eventKey="home" title="All Tasks">
          <AllTasks
            date={props.date}
            userId={props.userId}
            addedTask={addedTask}
            deletedTask={deletedTask}
            setDeletedTask={setDeletedTask}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
          />
        </Tab>
        <Tab eventKey="uncompleted" title="Uncompleted">
          <UncompletedTasks date={props.date} userId={props.userId} />
        </Tab>
        <Tab eventKey="progress" title="In-progress">
          <InProgressTasks date={props.date} userId={props.userId} />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedTasks date={props.date} userId={props.userId} />
        </Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your task below:</Modal.Body>
        <Form className="add-task-form" onSubmit={handleAdd}>
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
