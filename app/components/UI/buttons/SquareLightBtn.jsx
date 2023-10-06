import React from 'react'
import styles from './square-light.module.scss'

export default function SquareBtn(
  {
    disabled = false,
    type = 'text' ,
    btnId = 'toggle-modal',
    text,
    width = '198',
    height = '48',
    fontSize='20px',
    handler = () => {},
  }
  ) {
  if(type === 'red'){
    return (
      <button 
      disabled={disabled} 
      id={btnId} 
      onClick={handler} 
      style={{maxWidth:`${width}px`,maxHeight:`${height}px`,fontSize}} 
      className={styles.btnRed}>
        {text}
     </button>
    )
  }

  return (
    <button 
    disabled={disabled} 
    id={btnId} 
    onClick={handler} 
    style={{maxWidth:`${width}px`,maxHeight:`${height}px`,fontSize}} 
    className={styles.btn}>
      {text}
    </button>
  )
}
