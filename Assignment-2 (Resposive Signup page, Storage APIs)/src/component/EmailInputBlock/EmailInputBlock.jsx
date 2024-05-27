import React, { useState, useRef, useEffect } from "react";
import InputElementBlock from "../InputElementBlock/InputElementBlock";

export default function EmailInputBlock({
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
    const errorMessage = getErrorMessage(value);
    currentElement.setCustomValidity(errorMessage);
  }, [value]);

  return (
    <InputElementBlock
      blockId={blockId}
      inputId={inputId}
      labelName={labelName}
    >
      <input
        type="email"
        name={inputId}
        id={inputId}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => ref.current.reportValidity()}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoComplete="off"
        required
      />
    </InputElementBlock>
  );
}

function getErrorMessage(value) {
  const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value.trim().length === 0) {
    return "Please fill out this field";
  } else if (!value.includes("@")) {
    return `Please include an @ in your email. "${value}" doesn't have an @`;
  } else if (!EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email.";
  }
  return "";
}
