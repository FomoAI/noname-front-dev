import { useState } from 'react'
import styles from './range-input.module.scss'

export default function RangeInput() {
    const [progress,setProgress] = useState('75')

  return (
    <div className={styles.body}>
      <div style={{width:`${progress}%`}} className={styles.fakeBar}></div>
      <input 
      value={progress} 
      onChange={(e) => setProgress(e.target.value)} 
      type={'range'} />
    </div>
  )
}
