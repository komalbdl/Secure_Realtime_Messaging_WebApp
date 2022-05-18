import React,{useState} from 'react'
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios';
import './Chat.css';

function Chat({messages}) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) =>{
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: "demo app",
      timestamp: "Just now",
      recieved: true
    });

    setInput("");
  };
    return (
        <div className = 'chat'>

          <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
              <h3>Room Name</h3>
              <p>Last seen at...</p>
            </div>
            <div className="chat__headerRight">
              <IconButton >
                <SearchOutlinedIcon />
              </IconButton >
              <IconButton >
                <AttachFileIcon />
              </IconButton >
              <IconButton >
                <MoreVertIcon />
              </IconButton >
            </div>
          </div>

          <div className="chat__body">
          {messages.map((message)=>(
            <p className={`chat__message ${message.recieved && 'chat__reciever'}`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {message.timestamp}
              </span>
            </p>
          ))}
          </div>

          <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
              <button onClick={sendMessage} type="submit">Send a message</button>
            </form>
            <MicIcon />
          </div>
        </div>
    )
}

export default Chat;
