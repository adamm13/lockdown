import React from "react";
import '../../stylesheets/main.css';

export default function Controls(props) {

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