import { useState } from "react";
import Input from "./Input";

import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  const [enteredValues, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const [isEdit, setIsEdit] = useState({
    email: false,
    password: false,
  });

  const emailValid =
    isEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsValid =
    isEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmitForm(event) {
    event.preventDefault();
    console.log("submitted!", enteredValues);
  }

  function handleEnteredValues(identifier, value) {
    setEnteredValue((preValues) => ({
      ...preValues,
      [identifier]: value,
    }));
    setIsEdit((preValue) => ({
      ...preValue,
      [identifier]: false,
    }));
  }

  function handleEmailBlur(identifier) {
    setIsEdit((preValue) => ({
      ...preValue,
      [identifier]: true,
    }));
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmitForm}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={(event) => handleEnteredValues("email", event.target.value)}
          value={enteredValues.email}
          onBlur={() => handleEmailBlur("email")}
          error={emailValid && "Please enter a valid email."}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) =>
            handleEnteredValues("password", event.target.value)
          }
          value={enteredValues.password}
          onBlur={() => handleEmailBlur("password")}
          error={passwordIsValid && "Please enter valid password."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
        {/* When ever we click the button inside a form it will re-render entire page and to over come this problem we need to add type as button in the button filed or we nned to preventDefault page on submit   */}
      </p>
    </form>
  );
}
