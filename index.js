import { addToCookies, addToLocalStorage } from "@scripts/storage-api";

window.onload = () => {
  // Event Handler
  function handleSubmission(event) {
    // preventing default behavior
    event.preventDefault();

    // Extracting the data
    const targetElement = event.target;
    console.log(event);
    const formData = new FormData(targetElement);
    const data = Object.fromEntries(formData);

    // Given tasks
    addToCookies(data);
    addToLocalStorage(data);
    updateTheExternalFile(data);
  }
  // Validator
  function validator(event) {
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

  // Updates an external file selected by the user
  async function updateTheExternalFile(data) {
    try {
      const fileHandle = await window.showSaveFilePicker();
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
    } catch (err) {
      console.error(err);
    }
  }

  // Adding submit event listener
  const form = document.getElementById("sign-up-form");
  Object.values(form).forEach((elem) => {
    if (elem.value.length === 0) elem.setCustomValidity("Input is empty");
  });
  form.addEventListener("submit", handleSubmission);
  form.addEventListener("input", validator);
};
