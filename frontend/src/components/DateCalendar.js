import "./DateCalendar.css";
import Calendar from 'react-calendar';
import { useState } from "react";

function DateCalendar(props) {

  const { date, setDate } = props;

  return (
    <div>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center">
        <span>Selected Date:</span>
        {date.toDateString()}
      </p>
    </div>
  );
}

export default DateCalendar;
