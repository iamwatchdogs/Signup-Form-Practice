class FormHandler {
  constructor(formElement) {
    this._formElement = formElement;
    this._formSchemas = Object.freeze(this.getFormSchemas());
    // this.setFixedSchemas();
  }

  // --- not sure of it's working ---
  // setFixedSchemas() {
  //   const formSchemas = Object.freeze(this.getFormSchemas());
  //   Object.defineProperty(this, "formSchemas", {
  //     get: function () {
  //       return formSchemas;
  //     },
  //   });
  // }

  getFormSchemas() {
    const schematicDictionary = Object.values(this._formElement)
      .filter((item) => item.name)
      .map((item) => [item.name, item.type]);
    return Object.fromEntries(schematicDictionary);
  }

  getFormData() {
    const formData = new FormData(this._formElement);
    const data = Object.fromEntries(formData);
    return data;
  }

  validateSchemas(targetElement) {
    const actualSchemas = JSON.stringify(this._formSchemas);
    const targetSchemas = JSON.stringify(
      new FormHandler(targetElement).getFormData()
    );
    if (actualSchemas !== targetSchemas) {
      const message =
        "The form structure does not match the inital one. Please refresh and try again !!!...";
      alert(message);
      throw Error(message);
    }
  }
}

class FormEventHandler extends FormHandler{
  constructor(formElement){
    super(formElement);
    this._eventCallbackList = [];
  }

  #eventCallBackwrapper(callback) {
    const wrapper = (event) => {
      event.preventDefault();
      super.validateSchemas(event.target);
      callback(event);
    };
    return wrapper;
  }

  addEventListener({eventName, action}) {
    const wrappedCallback = this.#eventCallBackwrapper(action);
    super._formElement.addEventListener(eventName, wrappedCallback);
    this._eventCallbackList.push({ name: eventName, callback: wrappedCallback });
  }

  removeEventListener(eventType) {
    this.eventCallbackList
      .filter((eventCallback) => eventCallback.name === eventType)
      .forEach((eventCallback) =>
        this._formElement.removeEventListener(eventType, eventCallback)
      );
    this.eventCallbackList = this.eventCallbackList.filter(
      (eventCallback) => eventCallback.name !== eventType
    );
  }

}

// --- Old Implementation ---
// export default function handleSubmission(event) {
//   // preventing default behavior
//   event.preventDefault();

//   // Extracting the data
//   const targetElement = event.target;
//   console.log(event);
//   const formData = new FormData(targetElement);
//   const data = Object.fromEntries(formData);

//   // Given tasks
//   addToCookies(data);
//   addToLocalStorage(data);
//   updateTheExternalFile(data);
// }