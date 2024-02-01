import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Components/Button.js";
import styles from "../Components/header.module.css";
import storage from "../api/storage.js";
import Confirm from "./Confirm.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogout } from "../store/actions.js";

function Header() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const onLogout = () => {
    dispatch(authLogout());
  };

  const handleLogout = () => {
    onLogout();
    storage.remove("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.navBar}>
        <h1>Nodepop</h1>
        <NavLink to="/Adds/new" className={styles.navLink}>
          Create Ad
        </NavLink>
        <NavLink to="/Adds" className={styles.navLink}>
          Ads
        </NavLink>
        {authToken || sessionToken ? (
          <Button text="Logout" handleClick={handleShow} />
        ) : (
          <Button text="Log in" />
        )}
      </div>
      <Confirm
        show={show}
        handleShow={handleShow}
        notice={`Close session?`}
        btnText="Yes"
        handleAction={authToken || sessionToken ? handleLogout : handleLogin}
      />
    </div>
  );
}

export default Header;
