import styles from './project-links.module.scss'
import linkSvg from '../../icons/link.svg'
import Image from 'next/image'

export default function ProjectLinks({links}) {
  return (
    <div className={styles.body}>
        <div className={styles.title}>
          Ratings & Media
        </div>
        <div className={styles.links}>
          {
            links?.length
            ?
            links.map((link,index) => 
              <div className={styles.link} key={index}>
                  <a href={link.link} target={'_blank'}>{link.name}</a>
                  <Image src={linkSvg} alt='resoure-link'/>
              </div>
              )
            :
            <></>
            }
        </div>
    </div>
  )
}
