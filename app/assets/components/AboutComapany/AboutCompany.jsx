import styles from './about-company.module.scss'
import Image from 'next/image'
import MapCustom from '../googleMap/MapCustom'
import icons from '../../icons/socialmedia/socialmedia'

export default function AboutCompany({project}) {
  return (
    <div className={styles.wrapper}>
    <div className={styles.body}>
        <div className={styles.title}>
          About Company
        </div>
        <div className={styles.info}>
          <div className={styles.colum}>
              <div className={styles.item}>
                <div className={styles.key}>
                  Legal name: 
                </div>
                <div className={styles.value}>
                {project.company.name}
                </div> 
              </div>
              <div className={styles.item}>
                <div className={styles.key}>
                  Founded: 
                </div>
                <div className={styles.value}>
                {project.company.founded}
                </div> 
              </div>
              <div className={styles.item}>
                <div className={styles.key}>
                  Form: 
                </div>
                <div className={styles.value}>
                  {project.company.form}
                </div> 
              </div>
          </div>
          <div className={styles.colum}>
              <div className={styles.item}>
                <div className={styles.key}>
                  Employees: 
                </div>
                <div className={styles.value}>
                  7
                </div> 
              </div>
              <div className={styles.item}>
                <div className={styles.key}>
                  Website: 
                </div>
                <a 
                href={project.company.website} 
                className={styles.link}
                target='_blank'
                >
                {project.company.website}
                </a> 
              </div>
              <div className={styles.item}>
                <div className={styles.key}>
                Social media: 
                </div>
                <div className={styles.socialmedia}>
                  {project.socialmedia.map((item) => {
                    if(item.alt.includes('web')){
                      return (
                        <a key={item.alt} href={item.link} target='_blank'>
                          <Image width={'17'} src={icons.web} alt={item.alt}/>
                        </a>
                      )
                    }
                    return (
                      <a key={item.alt} href={item.link} target='_blank'>
                        <Image width={'17'} src={icons[item.alt]} alt={item.alt}/>
                      </a>
                    )
                  })}
                </div> 
              </div>
          </div>
        </div>
    </div>
    <div className={styles.map}>
      <MapCustom 
      location={project.company.location ? project.company.location : ','}/>
    </div>
    </div>
  )
}
