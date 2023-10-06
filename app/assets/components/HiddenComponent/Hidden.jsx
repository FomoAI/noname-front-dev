import styles from './hidden.module.scss'

export default function Hidden({children}) {

  return (
    <div className={styles.body}>
      <h1>{children}</h1>
    </div>
  )
}
