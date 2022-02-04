import { useState } from "react";

export default function useToggle(defaultValue, secondValue) {
  const [value, setValue] = useState(defaultValue);

  return [
    value,
    function () {
      setValue((prev) =>
        typeof prev === "boolean"
          ? !prev
          : prev === secondValue
          ? defaultValue
          : secondValue
      );
    },
    function () {
      return defaultValue === value;
    },
  ];
}
