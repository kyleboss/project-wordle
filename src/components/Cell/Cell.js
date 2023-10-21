import React from "react";

function Cell({ letter }) {
  const className = letter.status ? `cell ${letter.status}` : "cell";
  return <span className={className}>{letter.value}</span>;
}

export default Cell;
