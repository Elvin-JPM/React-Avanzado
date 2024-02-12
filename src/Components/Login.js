import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authLogin, authLoginFailure, uiResetError } from "../store/actions";
import { getUI } from "../store/selectors";

function Login({ handleShowMessage }) {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(getUI);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(null);
  const resetError = () => {
    dispatch(uiResetError());
  };

  const requestBody = {
    email,
    password,
  };

  const handleChange = (inputId, newValue) => {
    if (inputId === "email") setEmail(newValue);
    if (inputId === "password") setPassword(newValue);
  };

  const handleRememberUser = (event) => {
    setRemember(event.target.checked);
  };

  const handleClick = async () => {
    if (email && password) {
      try {
        await dispatch(authLogin(requestBody, remember));
      } catch (error) {
        dispatch(authLoginFailure(error));
        handleShowMessage(error.message, "showFailure");
        setTimeout(() => {
          handleShowMessage("", "doNotShow");
        }, 2000);
      }
    } else {
      handleShowMessage("Email and password required", "showFailure");
      setTimeout(() => {
        handleShowMessage("", "doNotShow");
      }, 2000);
    }
  };

  return (
    <>
      <form>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="email"
          handleChange={handleChange}
        ></Input>
        <Input
          id="password"
          type="password"
          value={password}
          placeholder="password"
          handleChange={handleChange}
        ></Input>

        <input
          role="button"
          type="button"
          value={"Login"}
          onClick={handleClick}
        ></input>
        <div>
          <input
            type="checkbox"
            id="remember"
            value="remember"
            onChange={handleRememberUser}
          ></input>
          <label htmlFor="remember">Remember username and password</label>
        </div>

        <label>Don't have an account?</label>
        <Link to="/signup">Sign up here</Link>
        {error && <div onClick={resetError}>{error.message}</div>}
      </form>
    </>
  );
}

function Input({ id, type, value, placeholder, handleChange }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        handleChange(id, event.target.value);
      }}
    ></input>
  );
}

export default Login;
