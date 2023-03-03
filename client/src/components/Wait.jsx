
import React, { useEffect, useState } from 'react'
import "../styles/modal.css"
import playersState from '../store/playersState.js'
import toolState from '../store/toolState'
export const Wait = ({...props}) => {
const [show,setShow] = useState(false) 
useEffect(()=>{
  if(playersState.modal===true){
    setTimeout(()=>{
      setShow(true)
    },1750)
  }
},)

if(playersState.modal===true){
  setTimeout(()=>{
    playersState.setModal(false)
    playersState.setWinner(null)
    playersState.setWinnerWord(null)
    playersState.setTimeIsOver(false)
    playersState.setTimer(false)
    toolState.setWidth(15)
    toolState.setFillColor("black")
    toolState.setStrokeColor("black")
  },2000)
}
  return (
    <div className={`waitWrapper`}>{playersState.modal===true
      ?
      <div className={`wait ${show?'animation':""}`}>
        <div className='winner'>
          {props.value} {props.name}
        </div>
        <div className='wrapperWord'>
          Загаданное слово:
          <div className='hiddenWord'>
            {props.hiddenWord}
          </div>
        </div>
      </div>
      :
      null
    }
    </div>
  )
}
