import styles from '../styles/add-btn.module.scss'

export default function AddBtn({handler,text = '+',id = 'none'}) {
  return (
    <button id={id} onClick={handler} className={styles.add}>{text}</button>
  )
}
