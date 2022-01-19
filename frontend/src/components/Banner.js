import React from 'react';

export default function Banner(props) {

  const { firstName, lastName } = props;

  return (
  <div className="banner">
    {firstName} {lastName}'s To-Do-List
  </div>
  )
}
