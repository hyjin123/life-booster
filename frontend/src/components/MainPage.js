import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DateCalendar from "./DateCalendar";
import "./MainPage.css";
import axios from "axios";

function MainPage(props) {
  const [date, setDate] = useState(new Date());
  const { userId, setUserId } = props;
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleClick = () => {
    console.log("hello");
  };

  // get the jwt token from local storage if the user is logged in and has a token
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const user = res.data.user;
        setUserId(user.id)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="main-container">
      <NavBar />
      <div className="calendar-container">
        <div className="selected-day">
          <div>{months[date.getMonth()]}</div>
          <div className="selected-weekday-number">{date.getDate()}</div>
          <div className="selected-weekday">{weekdays[date.getDay()]}</div>
          <div className="view-button-div">
            <button onClick={handleClick} className="view-button">
              View To-Do List
            </button>
          </div>
        </div>
        <DateCalendar date={date} setDate={setDate} />
      </div>
    </div>
  );
}

export default MainPage;
