import React from 'react'
import '../styles/toolbar.css'
import"../styles/center.css"
import { MyButton } from '../UI/MyButton'
export const Toolbar = () => {
  return (
   
      <div className='toolbar center'>
        <div className='tools'>
          <input type="color" style={{height:"40px", width:"80px"}}/>
          <MyButton>Clear</MyButton>
          <input type="range" start="0" min="0" max="3" className='weight'/>
          <MyButton className="button" id ='fill'>fill</MyButton>
        </div>
      </div>
    
  )
}
