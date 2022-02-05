import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import EachTask from "./EachTask";

export default function Tasks(props) {
  const [allUncompletedTasks, setAllUncompletedTasks] = useState([]);
  const [allInProgressTasks, setAllInProgressTasks] = useState([]);
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);
  const [deletedTask, setDeletedTask] = useState(0)
  const [editedTask, setEditedTask] = useState(0);

  const navigate = useNavigate();

  // access the url parameter and save it in a variable
  const { status } = useParams();

  // retrive the user info from the local storage since that data persists (can use redux for this in the future)
  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user.first_name;
  const lastName = user.last_name;
  const userId = user.id;

  // handle clicking of "go back to the calendar"
  const handleClick = () => {
    navigate("/home");
  };

  // make 4 backend requests to retrive all, uncompleted, in-progress, and completed tasks
  useEffect(() => {
    Promise.all([
      axios.get("/task/uncompleted/all", {
        params: {
          userId: userId,
        },
      }),
      axios.get("/task/in-progress/all", {
        params: {
          userId: userId,
        },
      }),
      axios.get("/task/completed", {
        params: {
          userId: userId,
        },
      }),
    ]).then((all) => {
      // set state with data coming from the backend
      setAllUncompletedTasks(all[0].data);
      setAllInProgressTasks(all[1].data);
      setAllCompletedTasks(all[2].data);
    });
  }, [deletedTask, editedTask]);

  // map through not completed tasks
  const listUnCompletedItems = allUncompletedTasks.map((task) => {
    return (
      <EachTask
        key={task.id}
        date={task.date}
        id={task.id}
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
          <div className="table-header2">
            <div className="table-type">Type</div>
            <div>Date</div>
            <div>Status</div>
            <div>Name</div>
            <div>Details</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>
          {listUnCompletedItems}
        </div>
      </div>
    </div>
  );
}