/* eslint-disable react-hooks/exhaustive-deps */

import Input from "components/Input";
import { useEffect, useState } from "react";
import { DEFAULTINPUT } from "Static";

function Rounds({ mode, onChange }) {
  const defaultRounds = DEFAULTINPUT.rounds;
  const [rounds, setRounds] = useState(defaultRounds);

  const handleChange = ({ input }) => {
    setRounds(input);
  };

  useEffect(() => {
    onChange({ input: rounds, setting: "rounds" });
  }, [rounds]);

  useEffect(() => {
    setRounds(defaultRounds);
  }, [mode]);

  // TODO set max rounds.
  return (
    <Input
      name="rounds"
      value={rounds}
      onChange={handleChange}
      setting="rounds"
    />
  );
}

export default Rounds;
