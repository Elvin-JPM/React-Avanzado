import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "../api/api.js";

function Signup({ handleShowMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (inputId, newValue) => {
    if (inputId === "email") setEmail(newValue);
    if (inputId === "password") setPassword(newValue);
    if (inputId === "username") setUsername(newValue);
    if (inputId === "name") setName(newValue);
  };

  const requestBody = {
    email,
    password,
    username,
    name,
  };

  const handleClick = async (event) => {
    //event.preventDefault();
    console.log("Sign up button clicked!");
    if (validateEmail(email) && password.length >= 4 && username && name) {
      try {
        const response = await postData("/auth/signup", requestBody);
        console.log("status", response.status);
        if (response.status === 201) {
          handleShowMessage("USER CREATED!", "showSuccess");
          setTimeout(() => {
            handleShowMessage("", "doNotShow");
            navigate("/login");
          }, 2000);
        } else {
          throw new Error("Error al crear usuario");
        }
      } catch (error) {
        handleShowMessage(error.message, "showFailure");
      }
    } else {
      handleShowMessage("FAILURE: USER NOT CREATED.", "showFailure");
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
        <Input
          id="username"
          type="text"
          value={username}
          placeholder="username"
          handleChange={handleChange}
        ></Input>
        <Input
          id="name"
          type="text"
          value={name}
          placeholder="name"
          handleChange={handleChange}
        ></Input>

        <input type="button" value="Sign Up" onClick={handleClick} />
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
      required
      onChange={(event) => {
        handleChange(id, event.target.value);
      }}
    ></input>
  );
}

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export default Signup;
