import React from "react";
import "../styles/todoItem.css";
const TodoItem = ({ id, isCompleted, handleCheked }) => {
  return (
    <div className="lbl-container">
      <input
        type="checkbox"
        id={id}
        className="switch"
        defaultChecked={isCompleted}
        onChange={handleCheked}
      ></input>
      <label htmlFor={id} className="lbl"></label>
    </div>
  );
};

export default TodoItem;
