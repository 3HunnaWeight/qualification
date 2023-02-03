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
  const [words,setWords] = useState([])
  const [username, setUsername] = useState('')
  const [show,setShow] = useState(false)
  const [wordState,setWordState] = useState(false)
  const input = useRef()
  const params = useParams()
/*   const socket = useRef() */
  const canvasRef = useRef()
  let word = playersState.words[getRandomInt(0,5)]
  function info(){
     const userinfo = {
      event: 'sendPlayers',
      username,
      score:0,
      idSession: params.id,
      id:Date.now(),
    }
  
    canvasState.socket.send(JSON.stringify(userinfo))
    canvasState.socket.onmessage = (event) => {
      playersState.setShow(true)
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    } 
    
   
  }
/* useEffect(()=>{
  if(canvasState.socket!=null){
    canvasState.socket.send=()=>{JSON.stringify(
      {
        test:"test"
      }
    )}
    canvasState.socket.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      switch (msg.method) {
          case "draw":
              drawHandler(msg)
              break
      }
  }
  }

}) */
/* playersState.setShow(false) */

  const getWord = () =>{
    const randWord ={
      event:"word",
      idSession: params.id,
      someWord:word,
      id:Date.now(),
      toggle:"hide"
    }

  canvasState.socket.send(JSON.stringify(randWord))
  canvasState.socket.onmessage = (event) => {
      const wordFromServer = JSON.parse(event.data)
      setMessages(prev => [wordFromServer, ...prev])
      setWordState(true)
    playersState.setToggle(true)
    } 

  }
  messages.map(mess=>{if(mess.event==="word"){playersState.setShow(false)}})
 
  

console.log(words)
console.log(messages)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
//отследить количество пользователей если их 5 сделать рассылку на имен после чего добавить кнопку готов пока пользователей меньше 5 выводить идет подбор
  function connect() {
    socketState.setConnection(true)
    const socket = new WebSocket('ws://localhost:5000')
    canvasState.setSessionId(params.id)
    canvasState.setSocket(socket)
    
      socket.onopen = () => {
          const userinfo = {
            event: 'connection',
            username,
            idSession: params.id,
            id:Date.now(),
          }
          socket.send(JSON.stringify(userinfo))
       
      }
   
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        setMessages(prev => [message, ...prev])
        
      }

      socket.onclose= () => {
          console.log('Socket закрыт')
      }

      socket.onerror = () => {
          console.log('Socket произошла ошибка')
      }
      
  }
 

useEffect(()=>{
  canvasState.setCanvas(canvasRef.current)
    },[])

  const sendMessage = async () => {
    const message = {
        username,
        message: value,
        idSession: params.id,
        event: 'message'
    }

    canvasState.socket.send(JSON.stringify(message));
    setValue('')
}


return (
<div style={{display:"contents"}}> 
  <div className='recipient' style={{marginTop:"1%"}}>
  <div className="usernames">
            {messages.map(mess =>
                             <div key={mess.id}>
                                 {mess.event === 'sendPlayers'
                                     ? <div>{mess.username} {mess.score}</div>
                                     : null
                                 }
                             </div>
                         )}
                     </div>
                     <div>
                        {messages.length==2
                     ?info()
                    
                     :null
                     }
                     </div>
                    
                     <div>{messages.length>=2
                     ?null
                     :<div>wait</div>
                     }</div>
               
  </div>
<div className='canvas center'>
  <canvas ref={canvasRef} width={800} height={600}>

  </canvas>
  <Toolbar/>
</div>

<div key={Date.now()}>{playersState.show===true
?<button style={{zIndex:"999",position:'absolute',left:Math.random()*800+'px',top:Math.random()*800+'px'}} onClick={()=>{getWord();}}>asdasd</button>
:null
}</div>

<div className="chat" style={{marginTop:"1%"}}>
         {socketState.connection===false
         ?<div>
           <div className='2'>2</div>
  <div className='2'>3</div>
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
          {messages.length>=3
          ?<div ref={input} className="form">
          <input ref={input} className='input' placeholder='Сообщение' value={value} onChange={e => setValue(e.target.value)} type="text"/>
         <div className='btnSend' onClick={()=>{sendMessage()}}></div>
     </div>
          :null
          }
          <div>
          {words.map(wrd =>
                             <div key={Math.random()}>
                                 {wordState===true
                                     ? <div>
                                     {wrd.someWord}
                                 </div>
                                     : null
                                 }
                             </div>
                         )}
          </div>
        

                   <div className='containerMessages'>
                     <div className="messages">
                         {messages.map(mess =>
                             <div key={mess.id}>
                                 {mess.event === 'message'
                                     ? <div className="message" key={Date.now()}>
                                          {mess.username}. {mess.message}
                                 </div>
                                     : null
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
