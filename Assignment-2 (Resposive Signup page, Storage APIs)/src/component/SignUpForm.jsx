import React, { useRef } from "react";

import TextInputBlock from "./TextInputBlock/TextInputBlock";
import EmailInputBlock from "./EmailInputBlock/EmailInputBlock";
import PasswordInputBlock from "./PasswordInputBlock/PasswordInputBlock";
import UserAgreementBlock from "./UserAgreementBlock";
import SubmitButtonBlock from "./SubmitButtonBlock";

export default function SignUpForm() {
  const passwordRef = useRef(null);
  return (
    <form id="sign-up-form">
      <TextInputBlock
        blockId="full-name-block"
        inputId="full-name"
        labelName="Full Name"
        placeholder="Name..."
        tabIndex="1"
      />
      <EmailInputBlock
        blockId="email-block"
        inputId="email"
        labelName="Email"
        placeholder="Email..."
        tabIndex="2"
      />
      <TextInputBlock
        blockId="username-block"
        inputId="username"
        labelName="Username"
        placeholder="Username..."
        tabIndex="3"
      />
      <PasswordInputBlock
        blockId="password-block"
        inputId="password"
        labelName="Password"
        placeholder="***********"
        tabIndex="4"
        fromParentRef={passwordRef}
       />
      <PasswordInputBlock
        blockId="repeat-password-block"
        inputId="repeat-password"
        labelName="Repeat Password"
        placeholder="***********"
        tabIndex="5"
        passwordRef={passwordRef}
       />
      <UserAgreementBlock />
      <SubmitButtonBlock />
    </form>
  );
}
