import { useState } from 'react'
import Lottie from 'lottie-react'
import DirectionMore from '../directions/more/DirectionMore'
import blockScroll from '../../../utils/blockScroll'
import arrowLottie from '../../lotties-animations/NN Стрелка.json'
import playLottie from '../../lotties-animations/NN Play Blue.json'
import styles from './courses.module.scss'

const dataInitial = {
    title:'Для кого курс',
    description:'Learn from others, share your work, and extend your tool set with a diverse group',
    items:[
        {
            title:'Новачки без досвіду',
            description:`Хочете отримати якісну та практичну інформацію, щоб розібратися, як влаштований ринок криптовалют та почати заробляти на цьому`
        },
        {
            title:'Уже знайомі з ринком /2',
            description:`Маєте невеликий досвід, але результат нестабільний і переважно випадковий. Хочете структурувати всі навички та знання, щоб заробляти регулярно та не залежати від умов на ринку`
        },
        {
            title:'Класичне інвестування /3',
            description:`Але все ще не є активним учасником ринку. Для тих, хто прагне нових знань та актуальних інструментів`
        },
    ]
}

export default function CoursesInfo({data,programms}) {
    const [selectedProgramm,setSelectedProgramm] = useState() 
    const [isMore,setIsMore] = useState()

    const openMoreInfo = (item) => {
        setIsMore(true)
        setSelectedProgramm(item)
        blockScroll('add')
    }

    const modalHandler = (e) => {
        if(e.target.id === 'toggle-modal'){
            setIsMore(false)
            blockScroll('remove')
        }
    }

  return (
    <>
    <div className={styles.body}>
        <div className={styles.info}>
            <div className={styles.head}>
                <div className={styles.arrow}>
                    <Lottie animationData={arrowLottie}/>
                </div>
                <div className={styles.title}>
                    {data.title}
                </div>
            </div>
            <div className={styles.description}>
                {data.description}
            </div>
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
                            <div className={styles.moreInfo}>
                                <button
                                onClick={() => openMoreInfo(programms[index])}
                                >
                                    <div className={styles.playWrapper}>
                                        <Lottie animationData={playLottie}/>
                                    </div>
                                    <span>Подробиці програми</span>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    {
        <DirectionMore 
        handler={modalHandler}
        onClose={() => {
            setIsMore(false)
            blockScroll('remove')
        }}
        isVisible={isMore}
        moreInfo={selectedProgramm}/>
    }
    </>
  )
}
