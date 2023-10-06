import styles from './title.module.scss'

export default function Title({title,width = 375}) {
  return (
    <h1  className={styles.title}>{title}</h1>
  )
}
