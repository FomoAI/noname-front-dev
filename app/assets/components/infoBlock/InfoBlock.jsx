import SubTitle from '../subTitle/SubTitle'
import styles from './info.module.scss'

export default function InfoBlock({data}) {
  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <SubTitle>
                {data.title}
            </SubTitle>
            <div className={styles.description}>
                {data.description}
            </div>
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div className={styles.item} key={item.title + index}>
                            <div className={styles.itemTitle}>
                                {item.title}
                            </div>
                            <div className={styles.itemDescription}>
                                {item.description}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
