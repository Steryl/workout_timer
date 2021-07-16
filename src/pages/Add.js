import "App.css";
import Button from "components/Button";
import React, { useContext, useState } from "react";
import { AppContext } from "AppProvider";
import { LABELS, DEFAULTINPUT, MODES } from "Static";
import InputForm from "components/InputForm";

// Return a form to add a timer.
function Add() {
  const [input, setInput] = useState(DEFAULTINPUT);
  const [valid, setValid] = useState(false);
  const { pushToTimers } = useContext(AppContext);
  const { titles, buttons } = LABELS;

  // Push input to Appcontext when set.
  const handleSet = () => {
    pushToTimers(input);
  };

  const handleChange = (form) => {
    setValid(form.duration > 0);

    if (valid) {
      const countup = MODES[form.mode].countup;
      setInput({ ...form, countup });
    }
  };

  return (
    <div className="page">
      <div className="vertical-center">
        <div className="block">
          <div className="title margin">{titles.addtimer}</div>
          <InputForm onChange={handleChange} />
          <div className="flex">
            <Button link="/">{buttons.cancel}</Button>
            <Button link="/" onClick={handleSet} active={valid}>
              {buttons.set}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
