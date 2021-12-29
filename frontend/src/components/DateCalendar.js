import "./DateCalendar.css";
import Calendar from 'react-calendar';
import { useState } from "react";

function DateCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>React Calendar</h1>
      <div>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p>
        <span>Selected Date:</span>
        {date.toDateString()}
      </p>
    </div>
  );
}

export default DateCalendar;
