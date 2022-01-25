import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import axios from "axios";
import EachTask from "./EachTask";

export default function AllTasks(props) {
  // hooks for all tasks
  const [allTasks, setAllTasks] = useState([]);

  // props
  const {
    date,
    userId,
    addedTask,
    deletedTask,
    setDeletedTask,
    editedTask,
    setEditedTask,
  } = props;

  // map through ALL tasks
  const listItems = allTasks.map((task) => {
    return (
      <EachTask
        key={task.id}
        id={task.id}
        type={task.type}
        name={task.name}
        description={task.description}
        status={task.status}
        className="table-row"
        setDeletedTask={setDeletedTask}
        setEditedTask={setEditedTask}
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
        // save all tasks for a user in a state
        setAllTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, [addedTask, deletedTask, editedTask]);

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
      console.log(all[0].data);
      console.log(all[1].data);
      console.log(all[2].data);
      console.log(all[3].data);
    });
  }, []);

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
