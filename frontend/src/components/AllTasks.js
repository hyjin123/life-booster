import React, { useEffect, useState } from "react";
import "./AllTasks.css";
import axios from "axios";

export default function AllTasks(props) {
  // hooks for all tasks
  const [allTasks, setAllTasks] = useState([]);

  // props
  const { date, userId } = props;

  // map through all the tasks
  const listItems = allTasks.map((task) => {
    return (
      <div className="table-row">
        <div>{task.type}</div>
        <div>{task.name}</div>
        <div>{task.description}</div>
        <div>{task.status}</div>
        <button>Edit</button>
        <button>Delete</button>
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
      <div className="table-row">
        <div>hello</div>
      </div>
    </div>
  );
}

// icon/type
// name
// details
// status
// delete button
// completed button
// in progress button
// not completed button
// edit button
