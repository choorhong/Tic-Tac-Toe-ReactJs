import React from "react";
import "./Box.css";

const Box = props => {
  return (
    <div
      className="Box"
      onClick={props.touched && !props.winMarker ? props.click : null}
    >
      {props.marker}
    </div>
  );
};

export default Box;
