/* eslint-disable react-hooks/exhaustive-deps */

//TODO clean up inputs
import { useEffect, useState } from "react";
import { DEFAULTINPUT, INPUTS, MODES } from "Static";
import { getDuration } from "Functions";
import Select from "components/Select";
import React from "react";

// Get input components for each mode.
function InputForm({ onChange }) {
  const [form, setForm] = useState(DEFAULTINPUT);

  // Setting can be endtime, worktime or rounds.
  // Input can be either timeobject or integer for rounds.
  const handleInput = ({ input, setting }) => {
    const newForm = { ...form, [setting]: input };

    // Empty fields are NaN, take default value for those.
    // const cleanForm = removeNaN(newForm, DEFAULTINPUT);
    const duration = getDuration(newForm);
    const countup = MODES[form.mode].countup;
    setForm({ ...newForm, duration, countup });
  };

  // When selecting a different mode reset the input.
  const handleSelect = (mode) => {
    setForm({ ...DEFAULTINPUT, mode });
  };

  // When the input on the form changes, return it.
  useEffect(() => {
    onChange(form);
  }, [form]);

  // Return an array of input components, depending on the mode.
  const getInputs = () => {
    const inputs = MODES[form.mode].inputs;

    return inputs.map((input, i) =>
      React.cloneElement(INPUTS[input], {
        key: i,
        mode: form.mode,
        onChange: handleInput,
      })
    );
  };

  return (
    <>
      <Select onChange={handleSelect} />
      <div className="inputform">{getInputs()}</div>
    </>
  );
}

export default InputForm;
