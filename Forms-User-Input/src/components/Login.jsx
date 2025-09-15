import { useState, useRef } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmitForm(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
    }

    if (!enteredPassword) {
      setPasswordIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email..</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
          <div className="control-error">
            {passwordIsInvalid && <p>Please enter a valid password</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
        {/* When ever we click the button inside a form it will re-render entire page and to over come this problem we need to add type as button in the button filed or we nned to preventDefault page on submit   */}
      </p>
    </form>
  );
}
