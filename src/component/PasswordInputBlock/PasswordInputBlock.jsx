import React from "react";

import InputElementBlock from "../InputElementBlock/InputElementBlock";
import InputElement from "../InputElements/InputElement";

function ConvertToPasswordElement(PlainInputElement) {
  function getErrorMessage(value, passwordRef) {
    if (passwordRef && passwordRef.current) {
      if (passwordRef.current.value !== value) {
        return "The Password doesn't match";
      }
      return "";
    }

    if (value.length === 0) {
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
  const PasswordInputElement = (props) => {
    return (
      <PlainInputElement type="password" {...{ getErrorMessage }} {...props} />
    );
  };
  return PasswordInputElement;
}

export default function PasswordInputBlock({
  blockId,
  inputId,
  labelName,
  placeholder,
  tabIndex,
  fromParentRef,
  passwordRef,
}) {
  const PasswordInputElement = ConvertToPasswordElement(InputElement);

  return (
    <InputElementBlock
      blockId={blockId}
      inputId={inputId}
      labelName={labelName}
    >
      <PasswordInputElement
        {...{ inputId, placeholder, tabIndex, fromParentRef, passwordRef }}
      />
    </InputElementBlock>
  );
}
