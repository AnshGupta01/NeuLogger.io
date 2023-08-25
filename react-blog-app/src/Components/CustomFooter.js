import React from "react";
import "./CustomFooter.css";

export default function CustomFooter() {
  const year = new Date().getFullYear();
  return (
    <div className="mt-5">
      <footer
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >{`Created by © Github.com/AnshGupta01 (${year})`}</footer>
    </div>
  );
}
