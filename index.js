import handleSubmission from "@scripts/form-handler"
import validator from "@scripts/validator";

window.onload = () => {
  const form = document.getElementById("sign-up-form");
  Object.values(form).forEach((elem) => {
    if (elem.value.length === 0) elem.setCustomValidity("Input is empty");
  });
  form.addEventListener("submit", handleSubmission);
  form.addEventListener("input", validator);
};
