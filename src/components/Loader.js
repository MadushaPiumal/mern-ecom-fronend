import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <center>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </center>
  );
};

export default Loader;
