import React from "react";
import spinner from "../assets/spinner.gif";

const Spinner = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img src={spinner} alt="" />
      <span style={{ marginTop: 10, fontSize: 16, fontWeight: 500 }}>
        {message}
      </span>
    </div>
  );
};

export default Spinner;
