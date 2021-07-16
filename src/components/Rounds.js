/* eslint-disable react-hooks/exhaustive-deps */

import Input from "components/Input";
import { useEffect, useState } from "react";
import { DEFAULTINPUT, MAXINPUT } from "Static";

function Rounds({ mode, onChange }) {
  const defaultRounds = DEFAULTINPUT.rounds;
  const [rounds, setRounds] = useState(defaultRounds);

  const handleChange = ({ input }) => {
    setRounds(input);
  };

  // When rounds is changed return it to the parent.
  // Bring the setting to discern it from 'timeinput'.
  useEffect(() => {
    onChange({ input: rounds, setting: "rounds" });
  }, [rounds]);

  // When mode is changed we return to default.
  useEffect(() => {
    setRounds(defaultRounds);
  }, [mode]);

  return (
    <Input
      name="rounds"
      value={rounds}
      onChange={handleChange}
      setting="rounds"
      min={defaultRounds}
      max={MAXINPUT.rounds}
    />
  );
}

export default Rounds;
