import { ColorRing } from "react-loader-spinner"
import styles from './loading-modal.module.scss'

export default function LoadingModal({title,subTitle,description}) {
  return (
    <div className={styles.body}>     
    <ColorRing
    visible={true}
    height="100"
    width="100"
    wrapperClass="blocks-wrapper"
    colors={['#FF507D', '#FF507D', '#FF507D', '#FF507D', '#FF507D']}
    />
    <div className={styles.title}>
        {title}
    </div>
    <div className={styles.subTitle}>
        {subTitle}
    </div>
    <div className={styles.description}>
        {description}
    </div>
  </div>
  )
}
