import PasswordHasher from "./secure-password";

export class StorageHandler {
  constructor(data) {
    if(!data || Object.entries(data).length === 0){
      throw Error("Require data to create an instance of StorageHandler");
    }
    this._dataEntries = Object.entries(data);
  }

  addToCookies() {
    this._dataEntries
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .forEach((value) => (document.cookie = value));
    alert(`Updated Cookies: ${document.cookie}`);
  }

  #_compareWithCurrentLocalStorage(inputData) {
    const retrivedData = localStorage.getItem("data");
    return retrivedData && retrivedData === inputData;
  }

  addToLocalStorage() {
    const dataWithHashedPasswords = PasswordHasher.hashAllPasswords(
      this._dataEntries
    );
    const inputDataStringified = JSON.stringify(dataWithHashedPasswords);
    if (this.#_compareWithCurrentLocalStorage(inputDataStringified)) {
      alert("There is no change in previously entered data");
      return;
    }
    localStorage.setItem("data", inputDataStringified);
    alert(`Added to Local Storage: ${localStorage.getItem("data")}`);
  }
}