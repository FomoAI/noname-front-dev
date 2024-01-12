import styles from './closed.module.scss'

const ClosedPageLabel = ({text,label,description}) => {
  return (
    <div className={styles.body}>
        <div className={styles.head}>
        <div className={styles.text}>
            {text}
        </div>
        <div className={styles.label}>
            {label}
        </div>
        </div>
        {
          description
          ?
          <div className={styles.description}>
            {description}
          </div>
          :
          <></>
        }
    </div>
  )
}

export default ClosedPageLabel
