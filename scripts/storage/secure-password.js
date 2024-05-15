class PasswordHasher {
  constructor() {
    if (!PasswordHasher.instance) {
      PasswordHasher.instance = this;
    }
    return PasswordHasher.instance;
  }

  async hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashedPassword;
  }

  async hashAllPasswords(dataEntries) {
    let passwordHasherList = dataEntries.map(async ([key, value]) => {
      if (key.includes("password")) {
        value = await this.hashPassword(value);
      }
      return [key, value];
    });

    const hashedPasswordEntries = await Promise.all(passwordHasherList);
    return Object.fromEntries(hashedPasswordEntries);
  }
}

export default new PasswordHasher();
