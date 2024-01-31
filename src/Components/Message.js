import styles from "./Message.module.css";

function Message({ message, showMessage }) {
  console.log("Recibido: ", showMessage);
  return (
    <div className={styles[showMessage]}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
