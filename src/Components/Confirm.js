import Button from "./Button";
import styles from "../Components/confirm.module.css";
import { useState } from "react";
import { deleteData } from "../api/api";
import storage from "../api/storage";
import { useNavigate } from "react-router-dom";

function Confirm({ show, handleShow, adId, notice, btnText, handleAction }) {
  const navigate = useNavigate();
  const authToken = storage.get("authToken");
  const sessionToken = sessionStorage.getItem("authToken");

//   const handleDeleteClick = async () => {
//     const response = await deleteData(`/v1/adverts/${adId}`, {
//       headers: {
//         Authorization: `Bearer ${authToken ? authToken : sessionToken}`,
//       },
//     });
//     console.log("Response... :", response, adId);
//     if (response) {
//       console.log(`$Item deleted`);
//       navigate("/Adds");
//     } else {
//       console.error("Failed to delete item");
//     }
//   };

  return (
    <div className={show ? styles.modal : styles.modalHidden}>
      <p>{notice}</p>
      <div className={styles.btnContainer}>
        <Button
          text="Cancel"
          className={styles.cancelBtn}
          handleClick={handleShow}
        ></Button>
        <Button
          text={btnText}
          className={styles.deleteBtn}
          handleClick={handleAction}
        ></Button>
      </div>
    </div>
  );
}

export default Confirm;
