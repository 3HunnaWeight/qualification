export function info(setClose,setChat,uniqueName,username,params,canvasState,playersState,setMessages,toolState,canvasRef,Brush){
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

export const getWord = (params,word,canvasState,setClose,setMessages) =>{
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

export const plus = (params,uniqueName,canvasState)=>{
    const plus ={
      event:"plus",
      idSession:params.id,
      plusName:uniqueName
    }
    canvasState.socket.send(JSON.stringify(plus))
  }

export const getBonus = (params,uniqueName,canvasState)=>{
    const bonus ={
      event:"bonus",
      idSession:params.id,
      name:uniqueName
    }
    canvasState.socket.send(JSON.stringify(bonus))
  }

export const clear=(params,canvasState)=>{
    const clearMsg ={
      event:"clear",
      idSession:params.id,
    }
    canvasState.socket.send(JSON.stringify(clearMsg))
  }

export const fill=(params,canvasState)=>{
    const fillMsg ={
      event:"fill",
      idSession:params.id,
    }
    canvasState.socket.send(JSON.stringify(fillMsg))
  }

export function closeConnections(params,canvasState){
    const closeConnections={
      event:"closeServ",
      idSession:params.id
    }
    canvasState.socket.send(JSON.stringify(closeConnections))
  }

export const endGame = (params,canvasState) =>{
    const endGame={
      event:"end",
      idSession:params.id,
    }
    canvasState.socket.send(JSON.stringify(endGame))
  }

export  const changeColor=(params,color,canvasState)=>{
    const colorMsg ={
      event:"changeColor",
      idSession:params.id,
      currentColor:color
    }
    canvasState.socket.send(JSON.stringify(colorMsg))
  }

export  const changeWidth=(params,width,canvasState)=>{
    const widthMsg ={
      event:"changeWidth",
      idSession:params.id,
      currentWidth:width
    }
    canvasState.socket.send(JSON.stringify(widthMsg))
  } 
  