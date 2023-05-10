import React from 'react'
import { info } from '../gameLogic/serverRequests'
export const PlayersBlock = ({messages,players,close,setClose,setChat,uniqueName,username,params,canvasState,playersState,setMessages,toolState,canvasRef,Brush}) => {
  return (
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
          info(setClose,setChat,uniqueName,username,params,canvasState,playersState,setMessages,toolState,canvasRef,Brush)                   
          :
          null
      }
    </div>
  </div>
  )
}
