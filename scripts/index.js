import { initializeValidator, validateOnEvent } from "@validation/validator";
import { FormEventHandler } from "@form/form-handler";
import { FormEventList, SubmitEvent, InputEvent } from "@form/events";

import { addToCookies, addToLocalStorage } from "@storage/storage-api";
import updateTheExternalFile from "@external/save-to-external-file";

window.onload = () => {
  // reteriving required DOM elements
  const formElement = document.getElementById("sign-up-form");
  const passwordElement = document.getElementById("password");

  // initalizing validator
  initializeValidator(formElement);
  const validatorCallback = validateOnEvent(passwordElement);

  // Creating event handlers
  const formEventHandler = new FormEventHandler(formElement);
  const submitEvent = new SubmitEvent([
    addToCookies,
    addToLocalStorage,
    updateTheExternalFile,
  ]);
  const inputEvent = new InputEvent([validatorCallback]);

  // Addding Event handlers
  const eventList = new FormEventList([submitEvent, inputEvent]);
  eventList.forEach((event) => formEventHandler.addEventListener(event));
};

