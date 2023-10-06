import { useState } from 'react'
import DirectionMore from './more/DirectionMore'
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'
import blockScroll from '../../../utils/blockScroll'
import styles from './direction.module.scss'

export default function Directions({data}) {
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
        <SubTitle>
            {data.title}
        </SubTitle>
        <div className={styles.text}>
            {
                data.description
            }
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <section className={styles.item} key={index}>
                            <button 
                            onClick={() => openMoreInfo(item)}
                            className={styles.itemBtn}>More {'>'}</button>
                            <div className={styles.itemHead}>
                                <img src={loader('/img1.jpg')} alt={item.name} />
                                <div className={styles.itemInfo}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Start: </span>
                                            <span className={styles.value}>{item.start}</span>
                                        </div>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Format: </span>
                                            <span className={styles.value}>{item.format}</span>
                                        </div>
                                        <div className={styles.detailsItem}>
                                            <span className={styles.key}>Duration: </span>
                                            <span className={styles.value}>{item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <div className={styles.itemDescription}>
                                    {item.description}
                                </div>           
                        </section>
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
