import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DateCalendar from "./DateCalendar";
import "./MainPage.css";
import axios from "axios";
import Banner from "./Banner";
import List from "./List";

function MainPage(props) {
  const [date, setDate] = useState(new Date());
  const [listOn, setListOn] = useState(false);
  const [show, setShow] = useState(false);

  const { userId, setUserId, firstName, lastName, setFirstName, setLastName } =
    props;
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
    // after clicking on "view to do list", render the list by changing the listOn state
    setListOn(true);
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
        // set states based on logged in user information
        setUserId(user.id);
        setFirstName(user.first_name);
        setLastName(user.last_name);
      })
      .catch((err) => console.log(err));
  }, [userId, show]);

  return (
    <div className="main-container">
      <NavBar userId={userId} />
      <div className="second-container">
        <Banner firstName={firstName} lastName={lastName} />
        {!listOn && (
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
        )}
        {listOn && (
          <div className="todo-container">
            <List
              userId={userId}
              date={date}
              setListOn={setListOn}
              months={months}
              weekdays={weekdays}
              show={show}
              setShow={setShow}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
