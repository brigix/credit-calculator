import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={props.size}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default Button;
