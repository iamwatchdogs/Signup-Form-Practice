export default class Validator {
  static initializeValidator(formElement) {
    Object.values(formElement).forEach((elem) => {
      if (elem.value.length === 0) elem.setCustomValidity("Input is empty");
    });
  }

  constructor(element, passwordElement) {
    this._targetElement = element;
    this._passwordElement = passwordElement;
    this._errorMessages = [];
  }

  #reinitializeErrorMessages() {
    this._errorMessages = [];
  }

  textValidator() {
    const value = this._targetElement.value;
    if (value.trim().length === 0)
      this._errorMessages.push("Please enter proper value.");
  }

  emailValidator() {
    const value = this._targetElement.value;
    const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EMAIL_PATTERN.test(value)) {
      this._errorMessages.push("Please enter proper email.");
    }
  }

  checkboxValidator() {
    if (!this._targetElement.checked)
      this._errorMessages.push("Please accept the Terms.");
  }

  passwordValidator() {
    const value = this._targetElement.value;
    if (!/[A-Z]/.test(value)) {
      this._errorMessages.push("One uppercase character");
    }
    if (!/[a-z]/.test(value)) {
      this._errorMessages.push("One lowercase character");
    }
    if (!/[0-9]/.test(value)) {
      this._errorMessages.push("One numerical value");
    }
    if (!/[!@#$%^&]/.test(value)) {
      this._errorMessages.push("One special character");
    }
    if (value.length < 8) {
      this._errorMessages.push("Minimum of 8 characters");
    }
    if (value.length > 32) {
      this._errorMessages.push("Exceeded max characters limit");
    }
  }

  isRepeatedPasswordMatched() {
    if (this._passwordElement) {
      throw new Error(
        "Required a password before comparing it to other password element."
      );
    }
    const currentValue = this._targetElement.value;
    if (actualPassword.value !== currentValue) {
      this._errorMessages.push("Your password doesn't match.");
    }
  }

  #_collectFailedValidations() {
    const type = this._targetElement.type;
    this.#reinitializeErrorMessages();
    switch (type) {
      case "text":
        this.textValidator();
        break;
      case "email":
        this.emailValidator();
        break;
      case "password":
        this.passwordValidator();
        if (this._targetElement.name.includes("repeat")) {
          this.isRepeatedPasswordMatched();
        }
      case "checkbox":
        this.checkboxValidator();
        break;
      default:
        throw new TypeError("Invalid input type found!");
    }
  }

  #setCustomValidity() {
    this._targetElement.setCustomValidity(
      this._errorMessages.length !== 0
        ? `${this._errorMessages.join(", ")}`
        : ""
    );
  }

  dispatchValidator() {
    this._targetElement.reportValidity();
  }

  evaluate() {
    this.#_collectFailedValidations();
    this.#setCustomValidity();
    this.dispatchValidator();
  }
}
