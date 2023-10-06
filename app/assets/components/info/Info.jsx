import styles from './info.module.scss'

export default function Info({title,text}) {
  return (
    <div className={styles.info}>
        <div className={styles.title}>
            <h2>{title}</h2>
        </div>
        <span className={styles.text}>
            {text}
        </span>
    </div>
  )
}
