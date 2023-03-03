import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import "../styles/canvas.css"
import {useParams } from 'react-router-dom';
import "../assets/img/logo.png"
import"../styles/center.css"
import "../styles/chat.css"
import "../styles/recipient.css"
import Brush from '../tools/Brush'
import { Wait } from './Wait'
import { Toolbar } from './Toolbar'
import socketState from "../store/socketState"
import playersState from '../store/playersState'
import { Endgame } from './Endgame'
export const Canavs =observer (() => {
const [bonus,setBonus] = useState([])
const [messages, setMessages] = useState([]);
const [paint, setPaint] = useState(false);
const [words,setWords] = useState([])
const [uniquePlus,setUniquePlus] = useState([])
let [username, setUsername] = useState('')
const [wordState,setWordState] = useState(false)
const [state,setState]=useState(3)
const [loseWord, setLoseWord] = useState([])
const [players, setPlayers] = useState(0)
const [close,setClose] = useState(false)
const [uniqueName, setUniqueName] = useState()
const [isConnnected,setIsConnected] = useState(false)
const [chat, setChat] =useState(false)
const input = useRef()
const params = useParams()
const canvasRef = useRef()
const playerStack = useRef()
const connectInput = useRef()
let word = playersState.words[getRandomInt(0,173)]

 if(close){
  window.onbeforeunload = function() {
    return true;
  }; 
}

useEffect(()=>{
  if(words.length>0){
    words.map(word=>setLoseWord([word.someWord]))
  }
  if(words.length==0){
    setWordState(false)
  }
},[words])

const modal = (name, word, value) => {
  playersState.setModal(true)
  return(
  <Wait
    name={name}
    hiddenWord={word}
    value={value}
  />)
}


  

function info(){
  setTimeout(()=>{
    setClose(true)
    setChat(true)
  },)
  const userinfo = {
    event:'sendPlayers',
    uniqueName,
    username,
    score:0,
    idSession: params.id,
    id:Math.random().toString(16).slice(2),
  }
  canvasState.socket.send(JSON.stringify(userinfo))
  canvasState.socket.onmessage = (event) => {
    playersState.setShow(true)
    const message = JSON.parse(event.data)
    setMessages(prev => [message, ...prev])
  } 
  toolState.setTool(new Brush(canvasRef.current,canvasState.socket,params.id))
  toolState.setWidth(15)
}

 const filter=()=>{
  const newMessages = messages.filter(item=>{
    if(item.event!=="message"&&item.event!=="word"&&item.event!=="draw"&&item.event!=="clear"&&item!=="plus"){
      return true
    }
  })
  setMessages(newMessages)
  playersState.setShow(true)
}

const getWord = () =>{
  const randWord ={
    event:"word",
    idSession: params.id,
    someWord:word,
    id:Date.now(),
  } 
  canvasState.socket.send(JSON.stringify(randWord))
  canvasState.socket.onmessage = (event) => {
    setClose(true)
    const wordFromServer = JSON.parse(event.data)
    setMessages(prev => [wordFromServer, ...prev])
  }  
}
 
messages.map(mess=>{
  if(mess.event==="word"){
    playersState.setShow(false)
  }
})

useEffect(()=>{
  messages.map(mess=>{
    if(mess.event==="word"){
      setWords([mess])
    }
  })
  messages.map(mess=>{
    words.map(word=>{
      if(mess.message===word.someWord){
        setWords([])
      }
    })
  })
},[messages])

useEffect(()=>{
  messages.map(mess=>{
    words.map(word=>{
      if(mess.message===word.someWord){
        filter()
      }
    })
  })
},)
 
useEffect(()=>{
  if(playersState.timeIsOver===true){
    filter();
    setWords([]);
    setPaint(false)
    clear()
  }
},[playersState.timeIsOver])

useEffect(()=>{
  messages.map(mess=>{
    words.map(word=>{
      if(mess.message===word.someWord&&playersState.bonusScore){
        messages.map(user=>{
          if(mess.uniqueName==user.uniqueName){
            user.score+=3
          }
        })
      }
      if(mess.message===word.someWord&&playersState.bonusScore===false){
        messages.map(user=>{
          if(mess.uniqueName==user.uniqueName){
            user.score+=2
          }
        })
      }
    })
  })
},[state,messages])



const plus = ()=>{
  const plus ={
    event:"plus",
    idSession:params.id,
    plusName:uniqueName
  }
  canvasState.socket.send(JSON.stringify(plus))
}
const getBonus = ()=>{
  const bonus ={
    event:"bonus",
    idSession:params.id,
    name:uniqueName
  }
  canvasState.socket.send(JSON.stringify(bonus))
}




useEffect(()=>{
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName){setState(prev=>prev+1);setWords([]);setPaint(false);clear();playersState.setBonusScore(true);}})}})})
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName){playersState.setWinner(mess.username)}})}})})
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName){playersState.setTimer(false)}})}})})
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName){playersState.setTimeIsOver(false)}})}})})
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName){playersState.setWinnerWord(word.someWord)}})}})})
  messages.map(mess=>{words.map(word=>{if(mess.message===word.someWord){messages.map(user=>{if(mess.uniqueName==user.uniqueName&&paint){getBonus();}})}})}) 
  messages.map(user=>{if(user.score>=20){endGame()}})
},[messages])

if(words.length===1){
  playersState.setTimer(true)
}

const drawHandler = (msg) => {
  const figure = msg.figure
  const ctx = canvasRef.current.getContext('2d')
  switch (figure.type) {
      case "brush":
        ctx.lineCap = "round";
          Brush.draw(ctx, figure.x, figure.y)
      break;
      case "finish":
        ctx.beginPath()
      break;
  }
} 

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const clear=()=>{
  const clearMsg ={
    event:"clear",
    idSession:params.id,
  }
  canvasState.socket.send(JSON.stringify(clearMsg))
}
const fill=()=>{
  const fillMsg ={
    event:"fill",
    idSession:params.id,
  }
  canvasState.socket.send(JSON.stringify(fillMsg))
}
 
function connect(icv) {
  socketState.setConnection(true)
  const socket = new WebSocket('ws://localhost:5000')
  canvasState.setSessionId(params.id)
  canvasState.setSocket(socket)
  canvasState.setUsername(username)
  socket.onopen = () => {
    const userinfo = {
      players:icv,
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
  socket.onclose = (event) => {
    console.log(event)
  }
  socket.onerror = (event) => {
    console.log(event)
  }    
}
  
const changeColor=(color)=>{
  const colorMsg ={
    event:"changeColor",
    idSession:params.id,
    currentColor:color
  }
  canvasState.socket.send(JSON.stringify(colorMsg))
} 
const changeWidth=(width)=>{
  const widthMsg ={
    event:"changeWidth",
    idSession:params.id,
    currentWidth:width
  }
  canvasState.socket.send(JSON.stringify(widthMsg))
} 
 console.log(messages)

 function closeConnections(){
  const closeConnections={
    event:"closeServ",
    idSession:params.id
  }
  canvasState.socket.send(JSON.stringify(closeConnections))
}

if(canvasState.username) 
canvasState.socket.onmessage=(event)=>{
  let msg = (JSON.parse(event.data))
  switch(msg.event){
    case "draw":
      drawHandler(msg) 
      closeConnections()
      
    break;
    case "clear":
      ctx = canvasState.canvas.getContext("2d")
      ctx.clearRect(0,0,800,600)
      console.log("clear")
    break;
    case "fill":
      ctx = canvasState.canvas.getContext("2d")
      ctx.fillRect(0, 0, 800, 600);
    break;
    case "closeServ":
      setClose(true)
    break;
    case "message":
      setMessages(prev => [msg, ...prev])
      closeConnections()
    break;
    case "connection":
      setMessages(prev => [msg, ...prev])
    break;
    case "sendPlayers":
      setMessages(prev => [msg, ...prev])
      setIsConnected(true)
    break;
    case "word":
      setMessages(prev => [msg, ...prev])
    break;
    case "changeColor":
      toolState.setFillColor(msg.currentColor)
      toolState.setStrokeColor(msg.currentColor)
      console.log(msg.color)
    break;
    case "changeWidth":
      toolState.setWidth(msg.currentWidth)
    break;
    case "end":
      playersState.setEnd(true)
      console.log("end")
    break;
    case "plus":
     setUniquePlus([msg])
     setTimeout(()=>{
      setUniquePlus([])
     },100)
    break;
    case "bonus":
      console.log(213)
      setBonus([msg])
    break;
  }
}
console.log(bonus)

useEffect(()=>{
  messages.map(user=>{
    uniquePlus.map(userPlus=>{
      if(user.uniqueName===userPlus.plusName){
        user.score++
      }
    })
  })
},[uniquePlus,playersState.winner])


useEffect(()=>{
  if(bonus.length>0){
    messages.map(user=>{
      bonus.map(userBonus=>{
        if(user.uniqueName===userBonus.name){
          user.score++
        }
      })
    }) 
    setBonus([])
  }  
})

 
let ctx = null

useEffect(()=>{
  canvasState.setCanvas(canvasRef.current)
  ctx = canvasRef.current.getContext('2d')
  setUniqueName(Math.random().toString(16).slice(2));//
  window.onload=setLobby()//
},[])

const sendMessage = async (icv) => {
  const message = {
    uniqueName,
    username,
    message: icv,
    idSession: params.id,
    event: 'message',
    id:Math.random().toString(16).slice(2),
  }
  canvasState.socket.send(JSON.stringify(message));
  input.current.value=''
}



const endGame = () =>{
  const endGame={
    event:"end",
    idSession:params.id,
  }
  canvasState.socket.send(JSON.stringify(endGame))
}

const playersFn=(icv)=>{
  params.id+=icv
  let last = Number(params.id.slice(-1))
  setPlayers(last)
  window.location.href=`http://localhost:3000/${params.id}`;
}
const setLobby = ()=>{
  if(params.id!=undefined){
    let last = Number(params.id.slice(-1))
    setPlayers(last)
  }
}


return (
<div style={{display:"contents"}}>
  <div className={
    paint==false
      ?"hider"
      :"unhider"
   }>
  </div>
  {
    playersState.winner&&playersState.winnerWord!==null
      ?modal(playersState.winner,playersState.winnerWord,"Выиграл",)
      :null
  }

  {
    playersState.timeIsOver===true
      ?modal("Победителей нет",loseWord)
      :null
  }
  <div className='wordWrapper'>
    {words.map(wrd =>
      <div key={Math.random()}>
        {wordState===true
        ?
        <div style={{padding:"5px"}}>
          {wrd.someWord}
        </div>
        :
        null
        }
     </div>
    )}
  </div> 
  <div className='recipient' style={{marginTop:"1%"}}>
    <div className="usernames" >
      {messages.map(mess =>
        <div className='usernamesHolder' key={mess.id}>
          {mess.event === 'sendPlayers'
            ?
            <div className='playerBlock'>
              {mess.username} {mess.score}
            </div>
            :
            null
          }
        </div>
      )}
    </div>
    <div>
      {
        messages.length==players&&players>0&&close===false 
          ?
          info()                   
          :
          null
      }
    </div>
  </div>
  <div className='canvas center'>
    {chat===false 
      ?<div className='logo'>
        {
          <img src={require('../assets/img/logo.png')}/>
        }
      </div>
        :null
    }

    <canvas
      ref={canvasRef}
      width={800} 
      height={600}>
    </canvas>
    <Toolbar
    clear={clear}
    fill={fill}
    changeColor={changeColor}
    changeWidth={changeWidth}
    />
  </div>
  {playersState.end===true
    ? 
    <Endgame/>
    :
    null
  }
    
  <div className="chat" style={{marginTop:"1%"}}>
    {params.id!=undefined&&params.id.length==12
      ?
      <div className='setPlayersWrapper'>
        <div className='hint'>
          Создать комнату
        </div>
        <div className='inputWrapper'>
          <div>
            Количесво игроков:
          </div>
          <input className='setPlayers' ref={playerStack}  type="number" max={8} min={2} />
          <button className='set' onClick={()=>{playersFn(Number(playerStack.current.value));}}>
            Создать
          </button>
        </div>
      </div>
      :
      null
    }

  {socketState.connection===false&&params.id!=undefined&&params.id.length>12
    ?
    <div>
      <div className='links'>
        Пригласить друга:
          <div className='link'>
            http://localhost:3000/{params.id}
          </div>
      </div> 
      <div className="center">
        <div className="form">
          <input ref={connectInput} className='input'
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Введите ваше имя"/>
          <button className='buttonConnect' onClick={()=>{if(connectInput.current.value.length>0){connect();}}}>
            Войти
          </button>
        </div>
      </div>           
    </div>
    :
    <div>
      {messages.length>=players+1&&paint===false&&words.length&&chat===true
        ?
        <div className="form">
          <input ref={input} className='inputMsg' placeholder='Сообщение' type="text"/>
          <div className='btnSend' onClick={()=>{if(input.current.value.length>0){closeConnections();sendMessage(input.current.value.charAt(0).toUpperCase() + input.current.value.slice(1))};}}></div>
        </div>
        :
        null
      }
      <div className='containerMessages'>
        <div className="messages">
          {messages.map(mess =>
            <div key={mess.id}>
              {mess.event === 'message'
                ?
                <div className="message" key={Date.now()}>
                  {mess.username}.
                  {mess.message}
                </div>
                :
                null
              }
            </div>
          )}
        </div>
      </div>                            
    </div>            
  }                 
  </div>

  <div style={{position:"absolute",display:"contents"}} key={Date.now()}>{
    playersState.show===true&&playersState.modal===false&&isConnnected===true&&playersState.end===false
      ?
      <button style={{width:"auto",zIndex:"999",position:'absolute',left:Math.random()*800+'px',top:Math.random()*800+'px'}} onClick={()=>{
        closeConnections()
        getWord();
        setWordState(true);
        playersState.setTimer(true);
        setPaint(true)
        plus()
      }}>
          Получить слово
      </button>//занести клик в массив с именем кликнувшего и сравнивать
      :
      null
  } 
  </div>
</div>    
)
})
