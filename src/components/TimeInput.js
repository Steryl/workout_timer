/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LABELS, DEFAULTINPUT, MAXINPUT } from "Static";
import Input from "components/Input";
import { replaceNaN } from "Functions";

// Return three inputs for h,m,s.
// Setting can be either endtime or worktime.
function TimeInput({
  mode = DEFAULTINPUT.mode,
  setting = "endtime",
  onChange,
}) {
  // Time looks like this: { h: 0, m: 0, s: 0 }
  // Time will be strings to display empty fields.
  const defaultTime = DEFAULTINPUT[setting];
  const [time, setTime] = useState(defaultTime);

  // Merge the old time with the newly changed unit.
  const handleChange = ({ input, name }) => {
    setTime((prev) => ({ ...prev, [name]: input }));
  };

  // Return the time and setting with every change to the parent module.
  useEffect(() => {
    const cleanTime = replaceNaN(time, defaultTime);
    onChange({ input: cleanTime, setting });
  }, [time]);

  // Reset the time when mode is changed.
  useEffect(() => {
    setTime(defaultTime);
  }, [mode]);

  // TODO set max hours
  return (
    <div className="formline">
      {LABELS.settings[mode][setting]}:
      <Input
        name="h"
        value={time.h}
        onChange={handleChange}
        min={defaultTime.h}
        max={MAXINPUT.hours}
      />
      <Input
        name="m"
        value={time.m}
        onChange={handleChange}
        min={defaultTime.m}
        max="59"
      />
      <Input
        name="s"
        value={time.s}
        onChange={handleChange}
        min={defaultTime.s}
        max="59"
      />
    </div>
  );
}

export default TimeInput;
