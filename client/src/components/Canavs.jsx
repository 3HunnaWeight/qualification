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
import { PlayersBlock } from './PlayersBlock'
import { GameChat } from './GameChat'
import { gameLogicFunction } from '../gameLogic/gameLogicFunction'
import { endGame,closeConnections, fill, getBonus, plus, getWord, changeColor, changeWidth, clear} from '../gameLogic/serverRequests'
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

 const filter=()=>{
  const newMessages = messages.filter(item=>{
    if(item.event!=="message"&&item.event!=="word"&&item.event!=="draw"&&item.event!=="clear"&&item!=="plus"){
      return true
    }
  })
  setMessages(newMessages)
  playersState.setShow(true)
}

 console.log(playersState.show, playersState.modal,isConnnected,playersState.end)
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
    clearImport()
  }
},[playersState.timeIsOver])
console.log(playersState.bonusScore)
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

const getBonusImport = ()=>{
  return getBonus(params,uniqueName,canvasState)
}

const endGameImport = ()=>{
 return endGame(params,canvasState)
}

const fillImport = ()=>{
  return fill(params,canvasState)
}

const closeConnectionsImport = ()=>{
  return closeConnections(params,canvasState)
}

const changeColorImport = (color)=>{
  return changeColor(params,color,canvasState)
}

const changeWidthImport = (width)=>{
  return changeWidth(params,width,canvasState)
} 

const clearImport = ()=>{
  return clear(params,canvasState)
} 

useEffect(()=>{
  gameLogicFunction(messages,words,setState,setWords,setPaint,clearImport,playersState,getBonusImport,paint,endGameImport)
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

if(canvasState.username) 
canvasState.socket.onmessage=(event)=>{
  let msg = (JSON.parse(event.data))
  switch(msg.event){
    case "draw":
      drawHandler(msg) 
      closeConnectionsImport()
      
    break;
    case "clear":
      ctx = canvasState.canvas.getContext("2d")
      ctx.clearRect(0,0,800,600)
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
      closeConnectionsImport()
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
    break;
    case "changeWidth":
      toolState.setWidth(msg.currentWidth)
    break;
    case "end":
      playersState.setEnd(true)
    break;
    case "plus":
     setUniquePlus([msg])
     setTimeout(()=>{
      setUniquePlus([])
     },100)
    break;
    case "bonus":
      setBonus([msg])
    break;
  }
}

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

  <PlayersBlock
    messages={messages}
    players={players}
    close={close}
    setClose={setClose}
    setChat={setChat}
    uniqueName={uniqueName}
    username={username}
    params={params}
    canvasState={canvasState}
    playersState={playersState}
    setMessages={setMessages}
    toolState={toolState}
    canvasRef={canvasRef}
    Brush={Brush}
  />

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
      clear={clearImport}
      fill={fillImport}
      changeColor={changeColorImport}
      changeWidth={changeWidthImport}
    />
  </div>
  {playersState.end===true
    ? 
    <Endgame/>
    :
    null
  }
  <GameChat
    params={params}
    playerStack={playerStack}
    playersFn={playersFn}
    connectInput={connectInput}
    username={username}
    setUsername={setUsername}
    connect={connect}
    players={players}
    input={input}
    messages={messages}
    closeConnections={closeConnectionsImport}
    sendMessage={sendMessage}
    words={words}
    chat={chat}
    paint={paint}
  />
  <div style={{position:"absolute",display:"contents"}} key={Date.now()}>{
    playersState.show===true&&playersState.modal===false&&isConnnected===true&&playersState.end===false
      ?
      <button style={{width:"auto",zIndex:"999",position:'absolute',left:Math.random()*800+'px',top:Math.random()*800+'px'}} onClick={()=>{
        closeConnectionsImport()
        getWord(params,word,canvasState,setClose,setMessages);
        setWordState(true);
        playersState.setTimer(true);
        setPaint(true)
        plus(params,uniqueName,canvasState)
      }}>
          Получить слово
      </button>
      :
      null
  } 
  </div>
</div>    
)
})
