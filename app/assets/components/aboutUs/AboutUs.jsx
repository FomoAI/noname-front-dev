import SubTitle from '../subTitle/SubTitle'
import styles from './about.module.scss'

const dataInitial = {
    title:'About us',
    description:`We have created educational programs for mastering modern professions. Each of them provides an opportunity to acquire a skill in the real market and, as a result, earn money already during and after training. We are building a university that the market has needed for so long, and that we ourselves dreamed of. training. We are building a university that the market has needed for so long, and that we ourselves dreamed of.`,
    items:[
        {
            title:'2000+',
            description:'Learn from others, share your work'
        },
        {
            title:'4-12 needed',
            description:'Learn from others, share your work'
        },
        {
            title:'7 needed',
            description:'Learn from others, share your work'
        },
        {
            title:'3 needed',
            description:'Learn from others, share your work'
        },
    ]
}

export default function AboutUs({data}) {
  return (
    <div className={styles.body}>
        <SubTitle>
            {data.title}
        </SubTitle>
        <div className={styles.description}>
            {data.description}
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div key={index} className={styles.item}>
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
