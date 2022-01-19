import React from "react";
import { Tabs, Sonnet, Tab } from "react-bootstrap";

export default function List(props) {
  const { date, months, weekdays, setListOn } = props;

  // when a user clicks the back button, it renders and brings back the calendar
  const handleClick = () => {
    setListOn(false);
  };

  return (
    <div>
      <h1>
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()},{" "}
        {weekdays[date.getDay()]}
      </h1>
      <h3>
        <button onClick={handleClick}>Go Back to the Calendar</button>
      </h3>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="All Tasks"></Tab>
        <Tab eventKey="uncompleted" title="Uncompleted"></Tab>
        <Tab eventKey="progress" title="In-progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
      </Tabs>
    </div>
  );
}
