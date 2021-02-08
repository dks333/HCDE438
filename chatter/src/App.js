import "./App.css";
import TextInput from "./TextInput";
import { useState } from "react";
import Message from "./Message";
import NamePicker from "./NamePicker";

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <div className="logo" />
          CHATTER
        </div>

        <NamePicker saveName={setUsername} />
      </header>

      <div className="messages">
        {messages.map((m, i) => {
          return <Message key={i} {...m} />;
        })}
      </div>

      <TextInput send={(t) => setMessages([{ text: t }, ...messages])} />
    </div>
  );
}

export default App;
