/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { MODES, LABELS, DEFAULTINPUT } from "Static";

// Selects the mode.
function Select({ onChange }) {
  const [selected, setSelected] = useState(DEFAULTINPUT.mode);
  const modes = Object.keys(MODES);

  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange(selected);
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className="margin">
      <select
        onChange={handleChange}
        value={selected}
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
      >
        {modes.map((mode) => {
          return (
            <option key={mode} value={mode}>
              {LABELS.modes[mode]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
