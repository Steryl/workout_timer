import { GetDuration } from "Functions";
import React, { useState } from "react";
import { COUNTUP } from "Static";

const InputContext = React.createContext({});

// Minimal 1 round. You need rounds object within rounds object.
const DEFAULTINPUT = {
  endtime: { h: 0, m: 0, s: 0 },
  worktime: { h: 0, m: 0, s: 0 },
  rounds: { rounds: 1 },
  duration: 0,
  countUp: true,
};

// Provides context for the 'add' page, to prevent many callbacks.
const InputProvider = ({ children }) => {
  const [input, setInput] = useState(DEFAULTINPUT);
  const [reset, setReset] = useState(false);

  // Make a copy of old object, but set changed value.
  // Setting is endtime or worktime.
  const pushToInput = ({ mode, setting, unit, value }) => {
    const newSetting = { ...input[setting], [unit]: value };
    const newInput = { ...input, [setting]: newSetting };
    newInput.duration = GetDuration(newInput);
    newInput.countUp = COUNTUP[mode];

    setInput(newInput);
  };

  // Input will be reset when different mode is selected.
  const resetInput = () => {
    setReset(true);
  };

  const hasReset = () => {
    setReset(false);
  };

  return (
    <InputContext.Provider
      value={{
        input,
        pushToInput,
        resetInput,
        hasReset,
        reset,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputContext, DEFAULTINPUT };

export default InputProvider;
