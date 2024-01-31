import { useState } from "react";

import Message from "../Components/Message";
import Login from "../Components/Login";

function LoginLayout() {
  const [showMessage, setShowMessage] = useState("doNotShow");
  const [message, setMessage] = useState("");

  const handleShowMessage = (newMessage, newMessageStatus) => {
    setMessage(newMessage);
    setShowMessage(newMessageStatus);
  };

  return (
    <>
      <Login handleShowMessage={handleShowMessage} />
      <Message message={message} showMessage={showMessage} />
    </>
  );
}

export default LoginLayout;
