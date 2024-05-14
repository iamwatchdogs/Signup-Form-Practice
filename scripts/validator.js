export default function validator(event) {
  // validation for Texting input
  function inputTextValidator(value, errorMessages) {
    if (value.trim().length === 0)
      errorMessages.push("Please enter proper value.");
  }

  // validation for Password input
  function inputPasswordValidator(value, errorMessages) {
    if (!/[A-Z]/.test(value)) {
      errorMessages.push("One uppercase character");
    }
    if (!/[a-z]/.test(value)) {
      errorMessages.push("One lowercase character");
    }
    if (!/[0-9]/.test(value)) {
      errorMessages.push("One numerical value");
    }
    if (!/[!@#$%^&]/.test(value)) {
      errorMessages.push("One special character");
    }
    if (value.length < 8) {
      errorMessages.push("Minimum of 8 characters");
    }
    if (value.length > 32) {
      errorMessages.push("Exceeded max characters limit");
    }
  }

  // validation for Email input
  function inputEmailValidator(value, errorMessages) {
    const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EMAIL_PATTERN.test(value)) {
      errorMessages.push("Please enter proper email.");
    }
  }

  // validation for matching repeated password
  function isRepeatedPasswordMatched(value, errorMessages) {
    if (password.value !== value) {
      errorMessages.push("Your password doesn't match.");
    }
  }

  const targetElement = event.target;
  const errorMessages = [];

  switch (targetElement.type) {
    case "text":
      inputTextValidator(targetElement.value, errorMessages);
      break;
    case "email":
      inputEmailValidator(targetElement.value, errorMessages);
      break;
    case "password":
      inputPasswordValidator(targetElement.value, errorMessages);
      if (targetElement.name === "repeat-password")
        isRepeatedPasswordMatched(targetElement.value, errorMessages);
      break;
    case "checkbox":
      if (!targetElement.checked)
        errorMessages.push("Please accept the Terms.");
      break;
  }

  targetElement.setCustomValidity(
    errorMessages.length !== 0 ? `${errorMessages.join(", ")}` : ""
  );
  targetElement.reportValidity();
}
