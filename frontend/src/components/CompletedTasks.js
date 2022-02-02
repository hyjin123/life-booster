import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import { useNavigate } from "react-router";
import List from "./List";
import axios from "axios";

export default function CompletedTasks(props) {
  let navigate = useNavigate();

  const { firstName, lastName, userId } = props;

  const handleClick = () => {
    navigate("/home");
  }; 

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
      </div>
    </div>
  );
}
