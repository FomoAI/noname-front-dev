import styles from '../styles/academy-community.module.scss'

export default function AcademyCommunity({link,lang}) {
  console.log(link)
  return (
      lang === 'ENG'
      ?
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h2 className={styles.title}>Join the community</h2>
          <span className={styles.text}>Learn from others, share your work, and extend your tool set with a diverse group of web3 founders, community managers, growth hackers, marketers, content writers, and many more from around the world.</span>
        </div>
        <div className={styles.button}>
          <a target={'_blank'} href={link}>join our Discord</a>
        </div>
      </div>
      :
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h2 className={styles.title}>Приєднуйтеся до спільноти</h2>
          <span className={styles.text}>Вчіться в інших, діліться своєю роботою та розширюйте свій набір інструментів за допомогою різноманітної групи засновників web3, менеджерів спільноти, хакерів розвитку, маркетологів, авторів контенту та багатьох інших з усього світу.</span>
        </div>
        <div className={styles.button}>
          <a target={'_blank'} href={link}>Приєднуйтеся до Discord</a>
        </div>
      </div>
  )
}
