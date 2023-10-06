import Image from 'next/image'
import Lottie from 'lottie-react'
import CartLottie from '../../../lotties-animations/cart.json'
import Modal from '../../modal/Modal'
import arrowNext from '../../../icons/arrow-next.svg'
import styles from './more.module.scss'

export default function DirectionMore({onClose,handler,isVisible,moreInfo}) {
    console.log(moreInfo)
  return (
    <Modal 
    padding='34px 43'
    bodyClass='programm-modal'
    closeSize='big'
    width='1120'
    handler={handler}
    onClose={onClose}
    isVisible={isVisible}
    overflowY='auto'
    >
            <div className={styles.head}>
                <h2>{moreInfo?.moreTitle}</h2>
                <div className={styles.description}>
                    {moreInfo?.moreDescription}
                </div>
                <div className={styles.blocks}>
                    {
                        moreInfo?.moreBlocks?.map((block,index) => {
                            const itemsCount = block.items.length  

                            const columnLength = Math.ceil(itemsCount / 2)

                            return (
                                <div key={index}>
                                <div  className={styles.block}>
                                    <div className={styles.blockTitle}>
                                        {block.title}
                                    </div>
                                    <div className={styles.blockItems}>
                                        <div className={styles.blockColumn}>
                                        {
                                            block.items.map((item,index) => {
                                                if(index < columnLength){
                                                    return (
                                                        <div key={index} className={styles.blockItem}>
                                                            <span>{index + 1}.</span>
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        </div>
                                        <div className={styles.blockColumn}>
                                        {
                                            block.items.map((item,index) => {
                                                if(index >= columnLength){
                                                    return (
                                                        <div key={index} className={styles.blockItem}>
                                                            <span>{index + 1}.</span>
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className={
                                    moreInfo?.moreBlocks.length === (index + 1)
                                    ?
                                    styles.nextArrowWrapper + ' ' + styles.last
                                    :
                                    styles.nextArrowWrapper
                                    }>
                                    <Image 
                                    className={styles.nextArrow} 
                                    src={arrowNext} 
                                    alt='next info block'/>
                                </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.bottomText}>
                    {moreInfo?.moreBottomText}
                </div>
                <div className={styles.soldOut}>
                    <div className={styles.cartWrapper}>
                        <Lottie animationData={CartLottie}/>
                    </div>
                    <span>{moreInfo?.moreStatus}</span>
                </div>
            </div>
    </Modal>
  )
}
