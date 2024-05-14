import handleSubmission from "@scripts/form-handler"
import { initializeValidator, inputValidator } from "@scripts/validator";

window.onload = () => {
  const form = document.getElementById("sign-up-form");
  initializeValidator(form);
  form.addEventListener("submit", handleSubmission);
  form.addEventListener("input", inputValidator);
};
