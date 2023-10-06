import styles from './burger.module.scss'

export default function Burger({handler,id}) {
  return (
    <button 
    id={id}
    onClick={handler}
    className={styles.body}>
        <div id={id} className={styles.line1}></div>
        <div id={id} className={styles.line2}></div>
        <div id={id} className={styles.line3}></div>
    </button>
  )
}
