import { useState } from "react";

function NamePicker(props) {
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("Set Username: ");

  function save() {
    props.saveName(username);
    setShowInput(false);
  }
  if (showInput) {
    if (username === "Set Username: ") {
      setUsername("");
    }
    return (
      <div className="name-picker">
        <input
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={save}>OK</button>
      </div>
    );
  }

  return (
    <div className="name-picker">
      <div>{username}</div>
      <button onClick={() => setShowInput(true)}>EDIT</button>
    </div>
  );
}

export default NamePicker;
