import styles from '../styles/file-input.module.scss'
import { useId } from 'react'

export default function FileInput(
  {name = 'logo',accept = 'image/*',value = {},label,handler,index = 0,oldValue}
  ) {
    const id = useId()

  return (
    <div className={styles.body}>
        <label htmlFor={id}><span>+</span>
          {value?.name ? <span>{value.name}</span> : <span>{label}</span>}
        </label>
        <input onChange={(event) => handler(event,index,oldValue)} id={id} type="file" name={name} accept={accept}/>
    </div>
  )
}
