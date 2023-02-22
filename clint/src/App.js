import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; // Replace with your own server URL

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("xyz", (data) => {
      console.log("rst", data)
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const handleSendMessage = () => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.emit("message", "Hello, world!");
  // };

  return (
    <div>
      <h1>Socket.io Example</h1>
      <p>Received message: {message}</p>
      {/* <button onClick={handleSendMessage}>Send message</button> */}
    </div>
  );
}

export default App;
