import React from "react";

export default function InputElementBlock({
  blockId,
  inputId,
  labelName,
  children,
}) {
  return (
    <div id={blockId} className="input-label-block">
      <label htmlFor={inputId}>{labelName}</label>
      {children}
    </div>
  );
}
