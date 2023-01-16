import React, { useEffect, useState } from 'react'
import '../styles/toolbar.css'
import"../styles/center.css"
import { MyButton } from '../UI/MyButton'
import toolState from '../store/toolState'
export const Toolbar = () => {
  const setColor = e=>{
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }
 
const setLineWidth=(e)=>{
  toolState.setWidth(e.target.value)
  toolState.setWidthArc(e.target.value/2)}
  return (
    
      <div className='toolbar center'>
        <div className='tools'>
          <input onChange={e=>setColor(e)} type="color" style={{height:"40px", width:"80px"}}/>
          <MyButton>Clear</MyButton>
          <input type="range" onChange={e=>setLineWidth(e)} defaultValue={0} min={0} max={10} className='weight'/>
          <MyButton className="button" id ='fill'>fill</MyButton>
        </div>
      </div>
    
  )
}
