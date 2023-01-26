import React from 'react'
import "../styles/chat.css"
 import playersState from "../store/playersState"
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import socketState from "../store/socketState"
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import "../store/connection"
import socket from '../store/connection';
export const Chat = observer  (() => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [username, setUsername] = useState('')
  const params = useParams()
  const socket = useRef()

  function connect() {
      socketState.setConnection(true)
      socketState.setSessionId(params.id)
      
      socket.current = new WebSocket('ws://localhost:5000')
      socket.current.onopen = () => {
        console.log(2)
          const userinfo = {
            event: 'connection',
            username,
            idSession: params.id,
            id:Date.now(),
          }
          socket.current.send(JSON.stringify(userinfo))
          
      }
      socket.current.onmessage = (event) => {
          const message = JSON.parse(event.data)
          setMessages(prev => [message, ...prev])
          console.log(message)
          
      }
      socket.current.onclose= () => {
          console.log('Socket закрыт')
      }
      socket.current.onerror = () => {
          console.log('Socket произошла ошибка')
      }//вынести весть коннект в отдельный фаул
    
  }
 
  const sendMessage = async () => {
      const message = {
          username,
          message: value,
          idSession: params.id,
          
          event: 'message'
      }
      socket.current.send(JSON.stringify(message));
      setValue('')
  }

  if (!socketState.connection) {
      return (
        <div className="chat" style={{marginTop:"1%"}}>
          <div className="center">
              <div className="form">
                  <input className='input'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      type="text"
                      placeholder="Введите ваше имя"/>
                  <button className='buttonConnect' onClick={()=>{connect();}}>Войти</button>
              </div>
          </div>
          <div className='link'>Пригласить друга http://localhost:3000/{params.id}</div>
        </div>
      )
  }


  return (
   

      <div className="chat" style={{marginTop:"1%"}}>
              <div className="form">
                   <input className='input' placeholder='Сообщение' value={value} onChange={e => setValue(e.target.value)} type="text"/>
                  <div className='btnSend' onClick={()=>{sendMessage()}}></div>
              </div>
              <div className='containerMessages'>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
              </div>                         
          </div>
    
  );
}
)