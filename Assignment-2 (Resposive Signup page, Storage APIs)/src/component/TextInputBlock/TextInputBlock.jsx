import React, { useState, useEffect, useRef } from "react";

export default function TextInputBlock({
  blockId,
  inputId,
  labelName,
  placeholder,
  tabIndex,
}) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const currentElement = ref.current;
    currentElement.setCustomValidity(
      value.trim().length === 0 ? "Please Provide a valid Input" : ""
    );
    currentElement.reportValidity();
  }, [value]);

  return (
    <div id={blockId} className="input-label-block">
      <label htmlFor={inputId}>{labelName}</label>
      <input
        type="text"
        name={inputId}
        id={inputId}
        value={value}
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoComplete="off"
        required
      />
    </div>
  );
}
