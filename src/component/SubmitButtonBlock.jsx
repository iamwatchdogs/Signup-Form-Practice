import React from "react";

export default function SubmitButtonBlock() {
  return (
    <div id="submit-block">
      <button type="submit" id="submit" tabIndex="7" required>
        Sign Up
      </button>
      <p>
        <a href="#" title="signup">
          Sign in →
        </a>
      </p>
    </div>
  );
}
