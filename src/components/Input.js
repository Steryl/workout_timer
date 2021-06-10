/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { LABELS } from "Static";

// Returns a number input field.
function Input({ name, value, placeholder = "0", max = "", onChange }) {
  const [input, setInput] = useState(0);
  const label = LABELS.units[name];

  const handleChange = (e) => {
    const { validity, value } = e.target;
    if (validity) setInput(parseInt(value));
  };

  useEffect(() => {
    onChange({ input, name });
  }, [input]);

  return (
    <div className="right">
      <label htmlFor={name}>{label}:</label>
      <input
        type="number"
        name={name}
        onChange={handleChange}
        value={value}
        pattern="\d*"
        placeholder={placeholder}
        min="0"
        max={max}
      />
    </div>
  );
}

// Setting can be rounds, endtime or worktime. Units = h,m,s or null.
// export function Input({ value }) {
//   const minimal = DEFAULTINPUT[setting][unit];
//   const [value, setValue] = useState("");
//   const inputRef = useRef();

//   // Reset value when other mode is selected.
//   useEffect(() => {
//     if (reset) {
//       setValue("");
//       hasReset();
//     }
//   }, [reset]);

//   // If the user imput is empty use the default value.
//   useEffect(() => {
//     let newValue = value === "" ? minimal : value;
//     newValue = parseInt(newValue);

//     pushToInput({ mode, setting, unit, value: newValue });
//   }, [value]);

//   // In the event of user input.
//   const handleChange = (e) => {
//     const { valid } = inputRef.current.validity;

//     if (valid) {
//       setValue(e.target.value);
//     }
//   };
// }

export default Input;
