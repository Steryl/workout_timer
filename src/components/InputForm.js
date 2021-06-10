/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { DEFAULTINPUT } from "Static";
import Select from "components/Select";
import React from "react";
import TimeInput from "components/TimeInput";
import Rounds from "components/Rounds";

// Get input components for each mode.
function InputForm({ onChange }) {
  const [form, setForm] = useState(DEFAULTINPUT);

  // Setting can be endtime, worktime or rounds.
  // Input can be either timeobject or integer for rounds.
  const handleInput = ({ input, setting }) => {
    setForm({ ...form, [setting]: input });
  };

  // When selecting a different mode reset the input.
  const handleSelect = (mode) => {
    setForm({ ...DEFAULTINPUT, mode });
  };

  useEffect(() => {
    onChange(form);
  }, [form]);

  const inputForms = {
    stopwatch: <TimeInput mode={form.mode} onChange={handleInput} />,
    countdown: <TimeInput mode={form.mode} onChange={handleInput} />,
    xy: (
      <>
        <Rounds mode={form.mode} onChange={handleInput} />
        <TimeInput mode={form.mode} onChange={handleInput} />
      </>
    ),
    tabata: (
      <>
        <Rounds mode={form.mode} onChange={handleInput} />
        <TimeInput mode={form.mode} onChange={handleInput} />
        <TimeInput setting="worktime" mode={form.mode} onChange={handleInput} />
      </>
    ),
  };

  return (
    <>
      <Select onChange={handleSelect} />
      <div className="inputform">{inputForms[form.mode]}</div>
    </>
  );
}

export default InputForm;
