import { useState } from "react";
import NavBar from "./NavBar";
import DateCalendar from "./DateCalendar";
import "./MainPage.css";

function MainPage() {
  const [date, setDate] = useState(new Date());
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="main-container">
      <NavBar />
      <div className="calendar-container">
        <div className="selected-day">
        <div>{months[date.getMonth()]}</div>
          <div className="selected-weekday-number">{date.getDate()}</div>
          <div className="selected-weekday">{weekdays[date.getDay()]}</div>
          <div>
            <button className="view-button">View To-Do List</button>
          </div>
        </div>
        <DateCalendar date={date} setDate={setDate} />
      </div>
    </div>
  );
}

export default MainPage;
