import React from "react";
import './controls.css';

export default function Controls(props) {
  console.log(props);

  return (
    <ul className="controls">
      <li>W or ⬆ to move up</li>
      <li>A or ⬅ to move left</li>
      <li>S or ⬇ to move down</li>
      <li>D or ➡  to move right </li>
      <li>Spacebar to shoot</li>
    </ul>
  );
};