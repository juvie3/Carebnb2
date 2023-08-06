// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

    const demoLogIn = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential: 'Demo-User', password: 'password' }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

  return (
    <div id="login-box">
      <h1 id="log-in">Log In</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          <input
            className="login-form-items"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label >
          <input
            className="login-form-items"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <div className="errorr-login">{errors.credential}</div>}
        <button disabled={credential.length < 4 || password.length < 6} id="log-in-butt" type="submit" >{`S   u   b   m   i   t`}</button>
        <div onClick={demoLogIn} id='demo-link'>Demo User</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
