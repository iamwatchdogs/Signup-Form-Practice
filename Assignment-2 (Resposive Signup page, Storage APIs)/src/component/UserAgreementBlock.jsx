import React from "react";

export default function UserAgreementBlock() {
  return (
    <div id="user-agreement-block">
      <input
        type="checkbox"
        id="user-agreement"
        name="user-agreement"
        tabIndex="6"
        required
      />
      <label htmlFor="user-agreement">
        I agree to
        <a href="#" title="terms and conditions">
          <b>Terms of User</b>
        </a>
        .
      </label>
    </div>
  );
}
