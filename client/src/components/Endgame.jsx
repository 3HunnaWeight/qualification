import React, { useState,useEffect } from 'react'
import playersState from '../store/playersState'
export const Endgame = ({...props}) => {
    
  return (
    <div className={`endgameWrapper`}>
  
        {/* <div className='winnerName'>Победил:{props.name}</div> */}
      
        <div className='newGame' onClick={()=>{document.location.reload()}}>
          <div>
            Начать новую игру
          </div>
        </div>
    </div>
  )
}
