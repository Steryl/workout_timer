/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { ToTime } from "Functions";
import { LABELS } from "Static";
import Input from "components/Input";

// Return three inputs for h,m,s.
function TimeInput({ mode = "stopwatch", setting = "endtime", onChange }) {
  const defaultTime = ToTime(0);
  const [time, setTime] = useState(defaultTime);

  const handleChange = ({ input, name }) => {
    setTime((prev) => ({ ...prev, [name]: input }));
  };

  useEffect(() => {
    onChange({ input: time, setting });
  }, [time]);

  useEffect(() => {
    setTime(defaultTime);
  }, [mode]);

  return (
    <div className="formline">
      {LABELS.settings[mode][setting]}:
      <Input name="h" value={time.h} onChange={handleChange} />
      <Input name="m" value={time.m} onChange={handleChange} max="59" />
      <Input name="s" value={time.s} onChange={handleChange} max="59" />
    </div>
  );
}

export default TimeInput;
