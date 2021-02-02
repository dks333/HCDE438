import './App.css';
import TextInput from './TextInput';
import { useState } from 'react';
import Message from './Message'

function App() {
  const [messages,setMessages] = useState([{text:'hello'}])

  return <div className="App">
    <header className="header">
      <div className="logo" />
      CHATTER
    </header>

    <div className="messages">
      {messages.map((m,i)=> {
        return <Message key={i} {...m} />
      })}
    </div>

    <TextInput 
      send={(t) => setMessages( [ {text:t} ,...messages] )}
    />
  </div>
}

export default App;
