import React, { Children } from 'react'
import "../styles/button.css"
export const MyButton = (props) => {
  return (
    <button className='button'>{props.children}</button>
  )
}
