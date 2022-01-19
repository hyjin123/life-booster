import React from "react";

export default function Banner(props) {
  const { firstName, lastName } = props;

  return (
    <div className="banner">
      {firstName && (
        <h1>
          {firstName} {lastName}'s To-Do-List
        </h1>
      )}
    </div>
  );
}
