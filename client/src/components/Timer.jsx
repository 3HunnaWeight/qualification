import React, { useEffect, useState } from 'react'
import { getPadTime } from '../store/getPadTime'
import playersState from '../store/playersState'

export const Timer = ({...props}) => {
    const [time,setTime] = useState(2*60)
    const [state,setState] = useState(null)
    const minutes = getPadTime(Math.floor(time / 60))
    const sec = getPadTime(time-minutes*60)
    useEffect(()=>{
     /*    {time<90 ?setState(false) :setState(true)}
        playersState.setBonusScore(state) */
        if(time<90){
            playersState.setBonusScore(false)
            console.log(playersState.bonusScore)
        }
    })

   
    
    console.log(playersState.bonusScore)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime((time)=>(time>-1?time -10 : 0))
        },1000)
        
    },[])
    
   
  
  

    if(time<=0){
        playersState.setTimeIsOver(true)
        playersState.setModal(false)
        playersState.setBonusScore(true)
    }

  return (
    <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{sec}</span>
    </div>
  )
}
