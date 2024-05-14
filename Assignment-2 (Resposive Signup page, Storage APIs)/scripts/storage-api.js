// Adds data to cookies
export function addToCookies(data) {
  Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .forEach((value) => (document.cookie = value));
  alert(`Updated Cookies: ${document.cookie}`);
}

// Adds data to local storage
export function addToLocalStorage(data) {
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
