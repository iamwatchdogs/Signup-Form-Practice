class FormEvent {
  constructor(eventName, operations) {
    this._eventName = eventName;
    this._operations = operations;
  }
  get eventName() {
    return this._eventName;
  }
  batchExecutor(data) {
    this._operations.forEach((operation) =>
      data ? operation(data) : operation()
    );
  }
  callback = (event) => {
    this.batchExecutor(event);
  }
}

export class SubmitEvent extends FormEvent {
  constructor(operations) {
    super("submit", operations);
  }
  #extractData(event) {
    const targetElement = event.target;
    const formData = new FormData(targetElement);
    const data = Object.fromEntries(formData);
    return data;
  }
  callback = (event) => {
    const data = this.#extractData(event);
    super.batchExecutor(data);
  }
}

export class InputEvent extends FormEvent {
  constructor(operations) {
    super("input", operations);
  }
}

export class FormEventList {
  constructor(eventsList) {
    this._eventsList = [];
    eventsList.forEach((event) => this.pushEvent(event));
  }
  pushEvent(event) {
    if (!event.eventName || !event.callback) {
      throw new TypeError("tried to push invalid event object");
    }
    this._eventsList.push(event);
  }
  forEach(callback) {
    this._eventsList.forEach(callback);
  }
}
