import React from "react";
import "./CustomFooter.css";

export default function CustomFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >{`Copyright © Ansh Gupta ${year}`}</footer>
  );
}
