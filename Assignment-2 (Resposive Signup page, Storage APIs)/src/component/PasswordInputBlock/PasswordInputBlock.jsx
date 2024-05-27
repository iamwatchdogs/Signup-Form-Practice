import React, { useState, useRef, useEffect } from "react";

export default function PasswordInputBlock({
  blockId,
  inputId,
  labelName,
  placeholder,
  tabIndex,
  fromParentRef,
  passwordRef
}) {
  const [value, setValue] = useState("");
  const ref = fromParentRef || useRef(null);

  useEffect(() => {
    const currentElement = ref.current;
    const errorMessage = getErrorMessage(value, passwordRef);
    currentElement.setCustomValidity(errorMessage);
    currentElement.reportValidity();
  }, [value]);

  return (
    <div id={blockId} className="input-label-block">
      <label htmlFor={inputId}>{labelName}</label>
      <input
        type="password"
        name={inputId}
        id={inputId}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoComplete="off"
        required
      />
    </div>
  );
}

function getErrorMessage(value, passwordRef) {
  if(passwordRef && passwordRef.current) {
    if(passwordRef.current.value !== value) {
      return "The Password doesn't match";
    }
    return "";
  }

  if(value.length === 0) {
    return "Please fill out this field";
  } else if (!/[A-Z]/.test(value)) {
    return "Password requires a Uppercase letter";
  } else if (!/[a-z]/.test(value)) {
    return "Password requires a Lowercase letter";
  } else if (!/[0-9]/.test(value)) {
    return "Password requires a numerical value";
  } else if (!/[!@#$%^&]/.test(value)) {
    return "Password requires a special character";
  } else if (value.length < 8) {
    return "Password should min 8 characters";
  } else if (value.length > 32) {
    return "Password has exceed the length";
  }
  return "";
}