import "App.css";
import Button from "components/Button";
import React, { useContext, useState } from "react";
import { InputContext } from "providers/InputProvider";
import { AppContext } from "providers/AppProvider";
import { INPUTMODULES, MODES, LABELS } from "Static";

// Get input components for each mode.
function InputForm({ selected }) {
  const inputs = MODES[selected];

  // Make a clone so that we can add the key.
  const inputmodules = inputs.map((input, i) =>
    React.cloneElement(INPUTMODULES[input], { key: i, mode: selected })
  );

  return <div className="inputform">{inputmodules}</div>;
}

// Selects the mode.
function Select({ onChange }) {
  const modes = Object.keys(MODES);

  return (
    <div className="margin">
      <select
        onChange={onChange}
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

// Return a form to add a timer.
function Add() {
  const [selected, setSelected] = useState("stopwatch");
  const { pushToTimers } = useContext(AppContext);
  const { input, resetInput } = useContext(InputContext);
  const { titles, buttons } = LABELS;

  const setActive = input.duration > 0;

  // Push input to Appcontext when set.
  const handleSet = () => {
    pushToTimers({ mode: selected, input });
  };

  // When selecting a different mode reset the input.
  const handleSelect = (e) => {
    resetInput();
    setSelected(e.target.value);
  };

  return (
    <div className="page">
      <div className="vertical-center">
        <div className="block">
          <div className="title margin">{titles.addtimer}</div>
          <Select onChange={handleSelect} />
          <InputForm selected={selected} />
          <div className="flex">
            <Button link="/">{buttons.cancel}</Button>
            <Button link="/" onClick={handleSet} active={setActive}>
              {buttons.set}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
