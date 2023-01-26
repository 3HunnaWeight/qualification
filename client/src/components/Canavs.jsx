import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import "../styles/canvas.css"
import { useParams } from 'react-router-dom';
import"../styles/center.css"
import Brush from '../tools/Brush'
import { Toolbar } from './Toolbar'
import socketState from "../store/socketState"
import playersState from '../store/playersState'
export const Canavs =observer (() => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [connectCounter,setConnectCounter] = useState(false)
  const [username, setUsername] = useState('')
  const input = useRef()
  const params = useParams()
  const socket = useRef()
  const fn=()=>{
    input.current.style.display = 'none';
  }
  const canvasRef = useRef()
  function info(){
     const userinfo = {
      event: 'sendPlayers',
      username,
      idSession: params.id,
      id:Date.now(),
    }
    socket.current.send(JSON.stringify(userinfo))
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
     
      
    } 
   
  }
//отследить количество пользователей если их 5 сделать рассылку на имен после чего добавить кнопку готов пока пользователей меньше 5 выводить идет подбор
  function connect() {
    socketState.setConnection(true)
    socketState.setSessionId(params.id)
    socket.current = new WebSocket('ws://localhost:5000')

      socket.current.onopen = () => {
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
      
      }

      socket.current.onclose= () => {
          console.log('Socket закрыт')
      }

      socket.current.onerror = () => {
          console.log('Socket произошла ошибка')
      }
  }
  


useEffect(()=>{
  canvasState.setCanvas(canvasRef.current)
  toolState.setTool(new Brush(canvasRef.current))
    },[])

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

return (
<div style={{display:"contents"}}> 
  <div className='recipient' style={{marginTop:"1%"}}>

  <div className="usernames">
            {messages.map(mess =>
                             <div key={mess.id}>
                                 {mess.event === 'sendPlayers'
                                     ? <div>{mess.username}</div>
                                     : null
                                 }
                             </div>
                         )}
                     </div>
                     <div>
                        {messages.length===3
                     ?info()
                    
                     :<div>wait</div>
                     }
                     </div>
                     
                  
  </div>
<div className='canvas center'>
  <canvas ref={canvasRef} width={800} height={600}>

  </canvas>
  <Toolbar/>
</div>



<div className="chat" style={{marginTop:"1%"}}>
         {socketState.connection===false
         ?<div>
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
        
       
         :
        <div>
          <div ref={input} className="form">
                        <input ref={input} className='input' placeholder='Сообщение' value={value} onChange={e => setValue(e.target.value)} type="text"/>
                       <div className='btnSend' onClick={()=>{sendMessage()}}></div>
                   </div>
                   <div className='containerMessages'>
                     <div className="messages">
                         {messages.map(mess =>
                             <div key={mess.id}>
                                 {mess.event === 'connection'
                                     ? null
                                     : <div className="message">
                                         {mess.username}. {mess.message}
                                     </div>
                                 }
                             </div>
                         )}
                     </div>
                   </div>                         
         
        </div>
                   
        }                 

</div>








</div>

       
    
  )
})
