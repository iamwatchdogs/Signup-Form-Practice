async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

async function hashAllPasswords(dataEntries) {
  let passwordHasherList = dataEntries.map(async ([key, value]) => {
    if (key.includes("password")) {
      value = await hashPassword(value);
    }
    return [key, value];
  });

  const hashedPasswordEntries = await Promise.all(passwordHasherList);
  return Object.fromEntries(hashedPasswordEntries);
}

function compareWithCurrent(inputData) {
  const retrivedData = localStorage.getItem("data");
  return retrivedData && retrivedData === inputData;
}

export default async function addToLocalStorage(data) {
    if (!data) {
      throw new Error("invalid data object");
    }

    const dataEntries = Object.entries(data);
    const dataWithHashedPasswords = await hashAllPasswords(dataEntries);
  
    const inputDataStringified = JSON.stringify(dataWithHashedPasswords);
    if (compareWithCurrent(inputDataStringified)) {
      alert("There is no change in previously entered data");
      return;
    }
  
    localStorage.setItem("data", inputDataStringified);
    alert(`Added to Local Storage: \n${JSON.stringify(JSON.parse(localStorage.getItem("data")), null, 2)}`);
  }
  