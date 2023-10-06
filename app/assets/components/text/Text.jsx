import styles from './text.module.scss'

export default function Text({text}) {
  return (
    <div className={styles.text}>
      {text}
    </div>
  )
}
