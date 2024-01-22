import styles from './closed.module.scss'

const ClosedPageLabel = ({text,label,description,className}) => {
  return (
    <div className={styles.body + ' ' + styles[className]}>
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
