/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LABELS, DEFAULTINPUT, MAXINPUT } from "Static";
import Input from "components/Input";

// Return three inputs for h,m,s.
// Setting can be either endtime or worktime.
function TimeInput({
  mode = DEFAULTINPUT.mode,
  setting = "endtime",
  onChange,
}) {
  // { h: 0, m: 0, s: 0 }
  const defaultTime = DEFAULTINPUT[setting];
  const [time, setTime] = useState(defaultTime);

  // Merge the old time with the newly changed unit.
  const handleChange = ({ input, name }) => {
    setTime((prev) => ({ ...prev, [name]: input }));
  };

  // Return the time and setting with every change to the parent module.
  useEffect(() => {
    onChange({ input: time, setting });
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
