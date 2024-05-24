import React from "react";
import SignUpForm from "./component/SignUpForm";

import "./App.css";

export default function App() {
  return (
    <main>
      <div id="cover"></div>
      <div id="form-block">
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  );
}
