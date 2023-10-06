import Image from 'next/image'
import nonameItem from '../../img/noname-item.png'
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'
import styles from './study.module.scss'

const dataInitial = {
    title:'Формат навчання',
    description:'Learn from others, share your work, and extend your tool set with a diverse group',
    items:[
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
        {
            img:nonameItem,
            text:"Власна навчальна платформа з особистим кабінетом",
        },
    ]
}

export default function StudyFormat({data}) {
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
                        <div key={index} className={styles.item}>
                            <img src={loader(item.img)} alt={item.text} />
                            <div className={styles.itemText}>
                                {item.text}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
