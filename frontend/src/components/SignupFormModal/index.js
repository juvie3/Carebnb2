// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div id="signup-box">
      <h1 id="sign-up">Sign Up</h1>
      <form id="signup-form" onSubmit={handleSubmit}>

        <label>
          <input
            className="signup-form-items"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            className="signup-form-items"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            className="signup-form-items"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            className="signup-form-items"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            className="signup-form-items"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            className="signup-form-items"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.email && <div className="errorr-signup">{errors.email}</div>}
        {errors.username && <div className="errorr-signup">{errors.username}</div>}
        {errors.firstName && <div className="errorr-signup">{errors.firstName}</div>}
        {errors.lastName && <div className="errorr-signup">{errors.lastName}</div>}
        {errors.password && <div className="errorr-signup">{errors.password}</div>}
        {errors.confirmPassword && <div className="errorr-signup">{errors.confirmPassword}</div>}
        <button disabled={!firstName || !lastName || !email || username.length < 4 || password.length < 6 || !confirmPassword} id="sign-up-butt" type="submit">{`Sign Up`}</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
