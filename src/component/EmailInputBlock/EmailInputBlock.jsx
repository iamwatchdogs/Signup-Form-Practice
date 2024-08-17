import React from "react";

import InputElementBlock from "../InputElementBlock/InputElementBlock";
import InputElement from "../InputElements/InputElement";

function ConvertToEmailElement(PlainInputElement) {
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
  const EmailInputElement = (props) => {
    return (
      <PlainInputElement type="email" {...{ getErrorMessage }} {...props} />
    );
  };
  return EmailInputElement;
}

export default function EmailInputBlock({
  blockId,
  inputId,
  labelName,
  placeholder,
  tabIndex,
}) {
  const EmailInputElement = ConvertToEmailElement(InputElement);

  return (
    <InputElementBlock
      blockId={blockId}
      inputId={inputId}
      labelName={labelName}
    >
      <EmailInputElement {...{ inputId, placeholder, tabIndex }} />
    </InputElementBlock>
  );
}
