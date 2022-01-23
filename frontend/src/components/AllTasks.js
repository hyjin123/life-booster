import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import EachTask from "./EachTask";

export default function AllTasks(props) {
  // hooks for all tasks
  const [allTasks, setAllTasks] = useState([]);
  const [show, setShow] = useState(false);

  // props
  const { date, userId, addedTask, setDeletedTask } = props;

  // handles popup events, open and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // map through all the tasks
  const listItems = allTasks.map((task) => {
    return (
      <EachTask
        key={task.id}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        className="table-row"
      />
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
