/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LABELS } from "Static";

// Returns a number input field.
// 'name' can be: h; m; s or 'rounds'.
function Input({ name, value, min = 0, max = "", onChange }) {
  const [input, setInput] = useState(min);
  const label = LABELS.units[name];

  // When input is changes check the validity and set the state.
  const handleChange = (e) => {
    const { validity, value: newValue } = e.target;
    if (validity) {
      setInput(parseInt(newValue));
    }
  };

  // Return to parent module after each valid change.
  useEffect(() => {
    onChange({ input, name });
  }, [input]);

  // Use String(value) to prevent NaN errors.
  return (
    <div className="right">
      <label htmlFor={name}>{label}:</label>
      <input
        type="number"
        name={name}
        onChange={handleChange}
        value={String(value)}
        pattern="\d*"
        placeholder={min}
        min={min}
        max={max}
      />
    </div>
  );
}

export default Input;
