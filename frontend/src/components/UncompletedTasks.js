import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import { useNavigate } from "react-router";
import List from "./List";
import axios from "axios";

export default function UncompletedTasks(props) {
  let navigate = useNavigate();

  const { firstName, lastName, userId, setFirstName, setLastName, setUserId } = props;

  console.log(userId);

  const handleClick = () => {
    navigate("/home");
  };

  // get the jwt token from local storage if the user is logged in and has a token
  // const token = localStorage.getItem("jwtToken");

  // useEffect(() => {
  //   axios
  //     .get("/isUserAuth", {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       const user = res.data.user;
  //       // set states based on logged in user information
  //       setUserId(user.id);
  //       setFirstName(user.first_name);
  //       setLastName(user.last_name);
  //     })
  //     .catch((err) => console.log(err));
  // }, [userId]);

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
