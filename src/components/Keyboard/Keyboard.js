import React from "react";

import { LETTERS } from "../../constants";

function Keyboard({ letterStatuses, disabled, onAdd }) {
  return (
    <div className="keyboard">
      {LETTERS.map((letterRow, index) => (
        <div key={index} className="keyboard-row">
          {letterRow.map((letter) => (
            <button
              key={letter}
              className={`keyboard-key ${letterStatuses[letter]}`}
              disabled={disabled}
              onClick={onAdd}
              value={letter}
              type="button"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
