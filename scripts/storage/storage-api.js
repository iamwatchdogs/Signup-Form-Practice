import PasswordHasher from "./secure-password";

export function addToCookies(data) {
  if (!data) {
    throw new Error("invalid data object");
  }
  Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .forEach((value) => (document.cookie = value));
  alert(`Updated Cookies: ${document.cookie}`);
}

export function addToLocalStorage(data) {
  if (!data) {
    throw new Error("invalid data object");
  }

  function compareWithCurrent(inputData) {
    const retrivedData = localStorage.getItem("data");
    return retrivedData && retrivedData === inputData;
  }

  const dataEntries = Object.entries(data);
  const dataWithHashedPasswords = PasswordHasher.hashAllPasswords(dataEntries);

  const inputDataStringified = JSON.stringify(dataWithHashedPasswords);
  if (compareWithCurrent(inputDataStringified)) {
    alert("There is no change in previously entered data");
    return;
  }

  localStorage.setItem("data", inputDataStringified);
  alert(`Added to Local Storage: ${localStorage.getItem("data")}`);
}
