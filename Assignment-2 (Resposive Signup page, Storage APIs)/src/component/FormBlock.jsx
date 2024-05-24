import React from "react";

export default function FormBlock({ title }) {
  return (
    <div id="form-block">
      <h1>{title}</h1>
      <form id="sign-up-form">
        <div id="full-name-block" class="input-label-block">
          <label for="full-name">Full Name</label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            placeholder="Name..."
            tabindex="1"
            required
          />
        </div>
        <div id="email-block" class="input-label-block">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            tabindex="2"
            required
          />
        </div>
        <div id="username-block" class="input-label-block">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username..."
            tabindex="3"
            required
          />
        </div>
        <div id="password-block" class="input-label-block">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="***********"
            tabindex="4"
            required
          />
        </div>
        <div id="repeat-password-block" class="input-label-block">
          <label for="repeat-password">Repeat Password</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            placeholder="***********"
            tabindex="5"
            required
          />
        </div>
        <div id="user-agreement-block">
          <input
            type="checkbox"
            id="user-agreement"
            name="user-agreement"
            tabindex="6"
            required
          />
          <label for="user-agreement">
            I agree to
            <a href="#" title="terms and conditions">
              <b>Terms of User</b>
            </a>
            .
          </label>
        </div>
        <div id="submit-block">
          <button type="submit" id="submit" tabindex="7" required>
            Sign Up
          </button>
          <p>
            <a href="#" title="signup">
              Sign in →
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
