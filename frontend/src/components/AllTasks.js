import React, { useEffect } from "react";
import "./AllTasks.css"
import axios from "axios";

export default function AllTasks(props) {

  // props
  const { date } = props;

  // make a backend request to retrieve all the tasks for the chosen date
  useEffect(() => {
    axios.get(`/task/all?date=${date}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, [])

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
