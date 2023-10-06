import styles from '../styles/main.module.scss'
import Welcome from '../welcome/Welcome'
import Banner from '../banner/Banner'
import Projects from '../projects/Projects'
import Community from '../community/Community'
import HTMLReactParser from 'html-react-parser'

export default function Main({type,info,projects}) {
  return (
    <main className={styles.main}>
      <Welcome type={type}/>
      <div className={styles.pageInfo}>
          <div className={styles.pageInfoTitle}>
            {info.title}
          </div>
          <div className={styles.pageInfoBody}>
            {HTMLReactParser(info.description)}
          </div>
      </div>
      <Projects allProjects={projects} type={type} />
      <Banner/>
      <Community/>
    </main>
  )
}
