import React,{ useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import axios from './axios.js';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher('601772c2772d84fea9ab', {
    cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return ()=> {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
