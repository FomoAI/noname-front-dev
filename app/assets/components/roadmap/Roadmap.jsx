import styles from './roadmap.module.scss'
import SubTitle from '../subTitle/SubTitle'

export const checkStatus = (status) => {
    if(status === 'done'){
        return (
            <div className={styles.done}></div>
        )
    }
    if(status === 'inwork'){
        return (
        <div className={styles.inworkWrapper}>
            <div className={styles.inwork}></div>
        </div>
        )
    }
    if(status === 'upcoming'){
        return (
            <div className={styles.upcoming}></div>
        )
    }
}

export default function Roadmap({items}) {

  return (
    <div className={styles.body}>
        <SubTitle>
        Roadmap
        </SubTitle>
        <div className={styles.statusList}>
            <div className={styles.item}>
                <div className={styles.done}></div>
                <span>Done</span>
            </div>
            <div className={styles.item}>
                <div className={styles.inworkWrapper}>
                    <div className={styles.inwork}></div>
                </div>
                <span>In Work</span>
            </div>
            <div className={styles.item}>
                <div className={styles.upcoming}></div>
                <span>Upcoming</span>
            </div>
        </div>
        <div className={styles.stages}>
            {
                items.map((stage) => {
                    return (
                        <div key={stage.stage} className={styles.list}>
                            <div className={styles.title}>
                                {stage.stage}
                            </div>
                            <ul>
                                {
                                    stage.items.map((item,index) => {
                                        return (
                                            <li key={index} className={styles.item}>
                                                {checkStatus(item.status)}
                                                <div>
                                                    {item.text}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
