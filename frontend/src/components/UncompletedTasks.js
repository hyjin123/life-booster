import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import { useNavigate } from "react-router";
import axios from "axios";
import EachTask from "./EachTask";

export default function UncompletedTasks(props) {
  const [allUncompletedTasks, setAllUncompletedTasks] = useState();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user.first_name;
  console.log(firstName)
  const lastName = user.last_name;
  console.log(lastName)
  const userId = user.id;

  // handle clicking of "go back to the calendar"
  const handleClick = () => {
    navigate("/home");
  };

  // make an axios request to fetch ALL uncompleted tasks
  useEffect(() => {
    axios.get("/task/uncompleted/all", {
      params: {
        userId: userId,
      },
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="main-container">
      <NavBar />
      <div className="second-container">
        <Banner firstName={firstName} lastName={lastName} />
        <div className="task-container">
          <h3>
            <button className="main-button" onClick={handleClick}>
              Go Back to the Calendar
            </button>
          </h3>
        </div>
        <div className="table-container">
          <div className="table-header">
            <div className="table-type">Type</div>
            <div>Status</div>
            <div>Name</div>
            <div>Details</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>
          <h1>hello</h1>
        </div>
      </div>
    </div>
  );
}
