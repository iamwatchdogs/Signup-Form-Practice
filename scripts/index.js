import handleSubmission from "@form/form-handler"
import { initializeValidator, inputValidator } from "@validation/validator";

window.onload = () => {
  const form = document.getElementById("sign-up-form");
  initializeValidator(form);
  form.addEventListener("submit", handleSubmission);
  form.addEventListener("input", inputValidator);
};
