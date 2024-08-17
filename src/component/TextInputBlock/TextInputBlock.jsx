import React from "react";

import InputElementBlock from "../InputElementBlock/InputElementBlock";
import InputElement from "../InputElements/InputElement";

function ConvertToTextElement(PlainInputElement) {
  function getErrorMessage(value) {
    return value.trim().length === 0 ? "Please fill out this field" : "";
  }
  const TextInputElement = (props) => {
    return (
      <PlainInputElement type="text" {...{ getErrorMessage }} {...props} />
    );
  };
  return TextInputElement;
}

export default function TextInputBlock({
  blockId,
  inputId,
  labelName,
  placeholder,
  tabIndex,
  autoFocus,
}) {
  const TextInputElement = ConvertToTextElement(InputElement);

  return (
    <InputElementBlock
      blockId={blockId}
      inputId={inputId}
      labelName={labelName}
    >
      <TextInputElement {...{ inputId, placeholder, tabIndex, autoFocus }} />
    </InputElementBlock>
  );
}
