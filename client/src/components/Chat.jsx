import React from 'react'
import "../styles/chat.css"

import { useState, useRef } from 'react';
import { useEffect } from 'react';
export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef()
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('')

  function connect() {
      socket.current = new WebSocket('ws://localhost:5000')

      socket.current.onopen = () => {
          setConnected(true)
          const message = {
              event: 'connection',
              username,
              id: Date.now()
          }
          socket.current.send(JSON.stringify(message))
      }
      socket.current.onmessage = (event) => {
          const message = JSON.parse(event.data)
          setMessages(prev => [message, ...prev])
      }
      socket.current.onclose= () => {
          console.log('Socket закрыт')
      }
      socket.current.onerror = () => {
          console.log('Socket произошла ошибка')
      }
  }

  const sendMessage = async () => {
      const message = {
          username,
          message: value,
          id: Date.now(),
          event: 'message'
      }
      socket.current.send(JSON.stringify(message));
      setValue('')
  }
 console.log(messages)


  if (!connected) {
      return (
        <div className="chat" style={{marginTop:"1%"}}>
          <div className="center">
              <div className="form">
                  <input className='input'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      type="text"
                      placeholder="Введите ваше имя"/>
                  <button className='buttonConnect' onClick={connect}>Войти</button>
              </div>
          </div>
        </div>
      )
  }


  return (
      <div className="chat" style={{marginTop:"1%"}}>
          
              <div className="form">
                  <input className='input' placeholder='Сообщение' value={value} onChange={e => setValue(e.target.value)} type="text"/>
                  <div className='btnSend' onClick={sendMessage}></div>
              </div>
              <div className='containerMessages'>
                    <div className="messages">
                        {messages.map(mess =>
                            <div key={mess.id}>
                                {mess.event === 'connection'
                                    ? console.log(mess.username)
                                    : <div className="message">
                                        {mess.username}: {mess.message}
                                    </div>
                                }
                            </div>
                        )}
                    </div>
              </div>
          </div>
      
  );
}
