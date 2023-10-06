import React from 'react'
import styles from './square-blue.module.scss'

export default function SquareBtn(
  {
    disabled = false,
    type = 'none',
    btnId = 'toggle-modal',
    text,
    width = '198',
    height = '48',
    fontSize='20px',
    handler = () => {},
  }
  ) {

  if(type === 'blue'){
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

  return (
    <button 
    disabled={disabled} 
    id={btnId} 
    onClick={handler} 
    style={{maxWidth:`${width}px`,maxHeight:`${height}px`,fontSize}} 
    className={styles.btnBlue}>
      {text}
    </button>
  )
}
