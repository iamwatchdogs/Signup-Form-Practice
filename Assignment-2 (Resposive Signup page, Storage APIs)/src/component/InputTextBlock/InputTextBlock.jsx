import React from "react";

export default function InputTextBlock({
  blockId,
  blockClassName,
  inputId,
  inputTitle,
  placeholder,
  tabindex,
}) {
  return (
    <div id={blockId} className={blockClassName}>
      <label for={inputId}>{inputTitle}</label>
      <input
        type="text"
        name={inputId}
        id={inputId}
        placeholder={placeholder}
        tabindex={tabindex}
        required
      />
    </div>
  );
}
