import styles from './sub-title.module.scss'

export default function SubTitle({children}) {
  return (
    <h4 className={styles.subTitle}>
      {children}
    </h4>
  )
}
