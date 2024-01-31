import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { postData } from "../api/api";
import storage from "../api/storage";

function Login({ handleShowMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(null);
  const navigate = useNavigate();

  const requestBody = {
    email,
    password,
  };

  const handleChange = (inputId, newValue) => {
    if (inputId === "email") setEmail(newValue);
    if (inputId === "password") setPassword(newValue);
  };

  const handleRememberUser = (event) => {
    console.log(event.target.checked);
    setRemember(event.target.checked);
  };

  const handleClick = async () => {
    if (email && password) {
      try {
        const response = await postData("/auth/login", requestBody);
        console.log(response);
        if (response) {
          handleShowMessage("Success!", "showSuccess");
          setTimeout(() => {
            handleShowMessage("", "doNotShow");
            if (remember) {
              storage.set("authToken", response.data.accessToken);
            } else {
              sessionStorage.setItem("authToken", response.data.accessToken);
            }
            navigate("/adds");
          }, 2000);
        } else {
          throw new Error("Invalid credentials.");
        }
      } catch (error) {
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

        <input type="button" value={"Login"} onClick={handleClick}></input>
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
