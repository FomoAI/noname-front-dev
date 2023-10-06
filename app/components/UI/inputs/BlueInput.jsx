import styles from './blue-input.module.scss'

export default function BlueInput({value = '',handler,id = '',placeholder = '',type = 'string'}) {
  return (
    <input 
    type={type}
    className={styles.body} 
    placeholder={placeholder}
    value={value}
    id={id}
    onChange={(e) => handler(e,id)}
    />
  )
}
