import styles from '../styles/textarea.module.scss'

const TextAreaCustom = ({value,name,handler,label,placeholder}) => {
  return (
  <>
      {
        label
        ?
        <label 
        className={styles.label}
        htmlFor={name}>{label}</label>
        :
        <></>
      }
      <div className={styles.body}>

          <textarea
          placeholder={placeholder}
          id={name}
          value={value}
          name={name}
          onChange={(e) => handler(name,e.target.value)}
          />
      </div>
  </>
  )
}

export default TextAreaCustom;