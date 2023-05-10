import React from 'react'
import socketState from '../store/socketState';

export const GameChat = ({params,playerStack,playersFn,connectInput,username,setUsername,connect,players,input,messages,closeConnections,sendMessage,words,chat,paint}) => {
  return (
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
            http://45.130.43.31:8080/{params.id}
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
  )
}
