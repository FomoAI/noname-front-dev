import styles from '../../styles/recommendations.module.scss'
import Image from 'next/image'
import loader from '../../../utils/loader'


export default function Recommendations({remove,items}) {
    if(!items){
        return <></>
    }
    
  return (
    <div className={styles.body}>
        {items.map((item) => {
            return (
                <div key={item._id} className={styles.item}>
                    <div className={styles.img}>
                        <Image 
                        width={'280'}
                        height={'160'}
                        loader={() => loader(item.img)}
                        src={item.img}
                        alt={item.title}
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.date}>
                            {item.date}
                        </div>
                        <div className={styles.title}>
                            {item.title}
                        </div>
                    </div>
                    <div className={styles.remove}>
                        <button onClick={() => remove(item._id)}>
                            Remove
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
