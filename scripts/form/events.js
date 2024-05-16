class FormEvent{
    constructor({eventName, callback}){
        this.eventName = eventName;
        this.action = callback;
    }
}

class SubmitEvent{
    constructor(operations) {
        this._eventName = 'submit;'
        this._operations = operations;
    }
    get eventName(){
        return this._eventName;
    }
    #extractData(event){
        const targetElement = event.target;
        const formData = new FormData(targetElement);
        const data = Object.fromEntries(formData);
        return data;
    }
    #batchExecutor(data){
        this._operations.forEach(operation => operation(data));
    }
    callback(event){
        const data = this.#extractData(event);
        this.#batchExecutor(data);
    }
}