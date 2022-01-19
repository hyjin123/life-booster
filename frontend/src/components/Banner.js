import React from 'react';

export default function Banner(props) {

  const { firstName, lastName } = props;

  return (
  <div className="banner">
    You can do it! {firstName} {lastName}
  </div>
  )
}
