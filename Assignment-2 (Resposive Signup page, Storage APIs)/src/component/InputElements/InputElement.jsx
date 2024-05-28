import React, { useState, useRef, useEffect } from "react";

export default function InputElement({
  inputId,
  getErrorMessage,
  fromParentRef,
  passwordRef,
  ...props
}) {
  const [value, setValue] = useState("");
  const refElement = fromParentRef || useRef(null);

  useEffect(() => {
    const currentElement = refElement.current;
    const errorMessage = getErrorMessage(value, passwordRef);
    currentElement.setCustomValidity(errorMessage);
  }, [value]);

  return (
    <input
      name={inputId}
      id={inputId}
      value={value}
      ref={refElement}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => refElement.current.reportValidity()}
      autoComplete="off"
      required
      {...props}
    />
  );
}
