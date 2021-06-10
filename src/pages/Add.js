import "App.css";
import Button from "components/Button";
import React, { useContext, useState } from "react";
import { AppContext } from "AppProvider";
import { LABELS, DEFAULTINPUT } from "Static";
import { GetDuration } from "Functions";
import InputForm from "components/InputForm";

// Return a form to add a timer.
function Add() {
  const [input, setInput] = useState(DEFAULTINPUT);
  const { pushToTimers } = useContext(AppContext);
  const { titles, buttons } = LABELS;

  const setActive = input.duration > 0;

  // Push input to Appcontext when set.
  const handleSet = () => {
    pushToTimers(input);
  };

  const handleChange = (form) => {
    const duration = GetDuration(form);
    setInput({ ...form, duration });
  };

  return (
    <div className="page">
      <div className="vertical-center">
        <div className="block">
          <div className="title margin">{titles.addtimer}</div>
          <InputForm onChange={handleChange} />
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
