import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import axios from "axios";
import EachTask from "./EachTask";

export default function AllTasks(props) {
  // hooks for 4 different task statuses
  const [allTasks, setAllTasks] = useState([]);
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // props
  const {
    tabKey,
    date,
    userId,
    addedTask,
    deletedTask,
    setDeletedTask,
    editedTask,
    setEditedTask,
  } = props;

  // map through ALL tasks
  const listAllItems = allTasks.sort((a,b) => a.id - b.id).map((task) => {
    return (
      <EachTask
        key={task.id}
        date={task.date}
        id={task.id}
        priority={task.high_priority}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        className="table-row"
        setDeletedTask={setDeletedTask}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    );
  });

  // map through not completed tasks
  const listNotCompletedItems = notCompletedTasks.sort((a,b) => a.id - b.id).map((task) => {
    return (
      <EachTask
        key={task.id}
        date={task.date}
        id={task.id}
        priority={task.high_priority}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        className="table-row"
        setDeletedTask={setDeletedTask}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    );
  });

  // map through in-progress tasks
  const listInProgressItems = inProgressTasks.sort((a,b) => a.id - b.id).map((task) => {
    return (
      <EachTask
        key={task.id}
        date={task.date}
        id={task.id}
        priority={task.high_priority}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        className="table-row"
        setDeletedTask={setDeletedTask}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    );
  });

  // map through completed tasks
  const listCompletedItems = completedTasks.sort((a,b) => a.id - b.id).map((task) => {
    return (
      <EachTask
        key={task.id}
        date={task.date}
        id={task.id}
        priority={task.high_priority}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        className="table-row"
        setDeletedTask={setDeletedTask}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    );
  });

  // make 4 backend requests to retrive all, uncompleted, in-progress, and completed tasks
  useEffect(() => {
    Promise.all([
      axios.get("/task/all", {
        params: {
          date: date,
          userId: userId,
        },
      }),
      axios.get("/task/uncompleted", {
        params: {
          date: date,
          userId: userId,
        },
      }),
      axios.get("/task/in-progress", {
        params: {
          date: date,
          userId: userId,
        },
      }),
      axios.get("/task/completed", {
        params: {
          date: date,
          userId: userId,
        },
      }),
    ]).then((all) => {
      // set state with data coming from the backend
      setAllTasks(all[0].data);
      setNotCompletedTasks(all[1].data);
      setInProgressTasks(all[2].data);
      setCompletedTasks(all[3].data);
    });
  }, [addedTask, deletedTask, editedTask]);

  return (
    <div className="table-container">
      <div className="table-header">
        <div>High Priority</div>
        <div>Type</div>
        <div>Status</div>
        <div>Name</div>
        <div>Details</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      {tabKey === "home" && listAllItems}
      {tabKey === "uncompleted" && listNotCompletedItems }
      {tabKey === "in-progress" && listInProgressItems }
      {tabKey === "completed" && listCompletedItems }
    </div>
  );
}
