import Button from "./Button";
import styles from "../Components/confirm.module.css";

function Confirm({ show, handleShow, adId, notice, btnText, handleAction }) {
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
