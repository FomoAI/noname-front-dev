import styles from '../styles/community.module.scss'
import { useSelector } from 'react-redux'

export default function Community() {
  const discordLink = useSelector((state) => state.community.discord)


  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2 className={styles.title}>Join the community</h2>
        <span className={styles.text}>Share your ideas, find new partners, 
        learn from the experienced, 
        find new tools or solution, anything you need in order to achieve success</span>
      </div>
      <div className={styles.button}>
        <a target={'_blank'} href={discordLink}>join our Discord</a>
      </div>
    </div>
  )
}
