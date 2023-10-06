import loader from '../../../utils/loader'
import styles from './project-stats-item.module.scss'
import Image from 'next/image'

export default function ProjectsStatsItem({item}) {

  return (
    <>
      <div className={styles.body}>
        <div className={styles.project}>
          <div className={styles.projectImg}>
            <Image
              loader={() => loader(item.img)}
              width={"32"}
              height={"32"}
              src={item.img}
              alt={item.title}
            />
          </div>
          <div className={styles.projectInfo}>
            <span className={styles.name}>{item.title}</span>
            <span className={styles.value}>NFT & Collectibles</span>
          </div>
        </div>
        <div >
          { 
            item.tags.length === 1
            ?
            <div className={styles.tags}>
              <div className={styles.status}>{item.tags[0].value}</div>
            </div>
            :
            <></>
          }
          { 
            item.tags.length > 1
            ?
            <div className={styles.tags}>
              <div className={styles.status}>{item.tags[0].value}</div>
              <div className={styles.status}>{item.tags[1].value}</div>
            </div>
            :
            <></>
          }
        </div>
        
        <div className={styles.info}>{item.totalRaise ? item.totalRaise : '-'}</div>
        <div className={styles.info}>{item.high ? item.high : '-'}</div>
        <div className={styles.info}>{item.type ? item.type : '-'}</ div>
      </div>
      <hr className={styles.line} />
    </>
  );
}
