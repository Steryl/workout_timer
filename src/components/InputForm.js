/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { DEFAULTINPUT, INPUTS, MODES } from "Static";
import Select from "components/Select";
import React from "react";

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

  // When the input on the form changes, return it to calculate
  // if the minimim duration is 0, to enable 'set' button.
  useEffect(() => {
    onChange(form);
  }, [form]);

  // Create a array of input components, depending on the mode.
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
