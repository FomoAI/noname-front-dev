import styles from '../styles/input.module.scss'
import { useId } from 'react'

export default function Input({label,name,placeholder = '',value = '',handler,index = 0,type='text',autocomplete = true}) {
    const id = useId()

  return (
    <div className={styles.body}>
        <label htmlFor={id}>{label}</label>
        <input 
        autoComplete={autocomplete ? 'on' : 'off'}
        id={id} 
        name={name} 
        value={value} 
        onChange={(event) => handler(name,event.target.value,index)} 
        placeholder={placeholder} 
        type={type} 
        />    
    </div>
  )
}
