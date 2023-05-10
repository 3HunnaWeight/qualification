import React, { useEffect, useState } from 'react'
import '../styles/toolbar.css'
import"../styles/center.css"
import { MyButton } from '../UI/MyButton'
import toolState from '../store/toolState'
import { Timer } from './Timer'
import playersState from '../store/playersState'
export const Toolbar = ({...props}) => {
return (
  <div className='toolbar center'>
    {playersState.timer===true&&playersState.modal===false
      ? 
      <Timer/>
      :
      null
    }
    {playersState.modal
      ?
      null
      :
      <div className='tools'>
        <input onChange={(e)=>{playersState.setCurrentColor(e.target.value);props.changeColor(playersState.color)}} type="color" style={{height:"40px", width:"80px"}}/>
        <div onClick={()=>{props.clear()}}>
          <MyButton>
             Очистить
          </MyButton>
        </div>
      
        <input type="range" onChange={(e)=>{playersState.setWidth(e.target.value);props.changeWidth(playersState.width)}} defaultValue={15} min={0} max={50} className='weight'/>
        <div onClick={()=>{props.fill()}}>
          <MyButton>
            Завливка
          </MyButton>
        </div>
      </div>    
    }
  </div>
    
  )
}
