import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import "../styles/canvas.css"
import"../styles/center.css"
import Brush from '../tools/Brush'
import { Toolbar } from './Toolbar'
export const Canavs =observer (() => {
  const canvasRef = useRef()
  useEffect(()=>{
canvasState.setCanvas(canvasRef.current)
toolState.setTool(new Brush(canvasRef.current))
  },[])
  return (
    
       
       <div className='canvas center'>
        
        <canvas ref={canvasRef} width={800} height={600}>

        </canvas>
        <Toolbar/>
    </div>
    
  )
})
