/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState, useRef } from "react";
import { InputContext, DEFAULTINPUT } from "providers/InputProvider";
import { LABELS } from "Static";

// Setting can be rounds, endtime or worktime. Units = h,m,s or null.
export function Input({ mode, setting, unit = "rounds" }) {
  const { pushToInput, reset, hasReset } = useContext(InputContext);
  const minimal = DEFAULTINPUT[setting][unit];
  const [value, setValue] = useState("");
  const inputRef = useRef();

  // Reset value when other mode is selected.
  useEffect(() => {
    if (reset) {
      setValue("");
      hasReset();
    }
  }, [reset]);

  // If the user imput is empty use the default value.
  useEffect(() => {
    let newValue = value === "" ? minimal : value;
    newValue = parseInt(newValue);

    pushToInput({ mode, setting, unit, value: newValue });
  }, [value]);

  // In the event of user input.
  const handleChange = (e) => {
    const { valid } = inputRef.current.validity;

    if (valid) {
      setValue(e.target.value);
    }
  };

  return (
    <div className="right">
      <label htmlFor={setting}>{LABELS.units[unit]}:</label>
      <input
        type="number"
        name={setting}
        onChange={handleChange}
        value={value}
        ref={inputRef}
        pattern="\d*"
        placeholder={minimal}
        min="0"
        max={unit === "m" || unit === "s" ? "59" : ""}
      />
    </div>
  );
}

// Return three inputs for h,m,s.
export function TimeInput({ setting, mode }) {
  const units = ["h", "m", "s"];

  return (
    <div className="formline">
      {LABELS.settings[mode][setting]}:
      {units.map((unit) => (
        <Input key={unit} mode={mode} setting={setting} unit={unit} />
      ))}
    </div>
  );
}
