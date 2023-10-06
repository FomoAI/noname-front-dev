import { useState , useRef, useEffect} from 'react'
import styles from './time-input.module.scss'

export default function TimeInput({handler}) {
    const [time,setTime] = useState({
        hours:'',
        minutes:''
    })
    const minutesInputRef = useRef()
    const hoursInputRef = useRef()

    const timeValidation = (name,value) => {
        if(name === 'minutes' && value > 60) return false

        if(name === 'hours' && value > 24) return false

        return true
    } 

    const timeHandler = (name,value) => {
        if(value.length > 2) return

        if(value.length === 0 && name === 'minutes'){
            hoursInputRef.current.focus()
        }

        if(value.length > 1 && name === 'hours'){
            minutesInputRef.current.focus()
        }

        setTime((prev) => {
            return {...prev,[name]:value}
        })
    }

    useEffect(() => {
        handler(time)
    },[time])

  return (
    <div className={styles.body}>
        <input
        max={24}
        ref={hoursInputRef}
        onChange={(e) => timeHandler('hours',e.target.value)}
        placeholder='00'
        type='number'
        value={time.hours}
        />
        <span>:</span>
        <input
        max={60}
        ref={minutesInputRef}
        onChange={(e) => timeHandler('minutes',e.target.value)}
        placeholder='00'
        type='number'
        value={time.minutes}
        />
    </div>
  )
}
