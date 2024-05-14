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

  // Adds data to cookies
  function addToCookies(data) {
    Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .forEach((value) => (document.cookie = value));
    alert(`Updated Cookies: ${document.cookie}`);
  }

  // Adds data to local storage
  function addToLocalStorage(data) {
    // Hashing function
    async function hashPassword(password) {
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedPassword = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hashedPassword;
    }

    let promises = Object.entries(data).map(async ([key, value]) => {
      if (key.includes("password")) {
        value = await hashPassword(value);
      }
      return [key, value];
    });

    Promise.all(promises).then((results) => {
      let returnObj = {};
      results.forEach(([key, value]) => {
        returnObj[key] = value;
      });
      console.log(returnObj);
    });

    const inputDataStringified = JSON.stringify(data);
    const retrivedData = localStorage.getItem("data");
    if (retrivedData && retrivedData === inputDataStringified) {
      alert("There is no change in previously entered data");
      return;
    }
    localStorage.setItem("data", inputDataStringified);
    alert(`Added to Local Storage: ${localStorage.getItem("data")}`);
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
