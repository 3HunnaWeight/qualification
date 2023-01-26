import React from 'react'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import "../styles/recipient.css"
import { useParams } from 'react-router-dom';
import socketState from "../store/socketState"
import { observer } from 'mobx-react-lite';
export const Recipient = observer (()=> {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const params = useParams()
  const socket = useRef()

    if(socketState.connection===true){
    
     
            socket.current = new WebSocket('ws://localhost:5000')
            socket.current.onopen=()=>{
                const userinfo = {
                    event: 'connection',
                    name:"sosi"
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
          }//вынести весть коннект в отдельный фаул */
        }
    
            
     
  
        
    









  return (
    <div className='recipient' style={{marginTop:"1%"}}>
                 <div className="messages">
   
                </div>     
    </div>
  )
}
)