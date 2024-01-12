import { useState } from 'react'
import Lottie from 'lottie-react'
import Image from 'next/image'
import triangleIcon from '../../img/vote-triangle.jpg'
import voteAnim from '../../lotties-animations/VOTE.json'
import styles from './vote-item.module.scss'

const VoteItem = ({item,openVoteModal}) => {
    const [isOpen,setIsOpen] = useState(false)

  return (
    <>
    <div
    className={styles.wrapper}>
        <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.head}>
            <div className={styles.info}>
                <div className={styles.title}>
                    <span>{item.title}</span>
                    {
                        item.status !== 'Open'
                        ?
                        <Lottie animationData={voteAnim}/>
                        // <Image
                        // src={triangleIcon}
                        // alt={item.title}
                        // /> 
                        :
                        <></>
                    }
                </div>
                <div className={styles.posted}>
                    {item.posted}
                </div>
            </div>
            <div className={styles.details}> 
                <div className={styles.status}>
                    {item.status}
                </div>
                <div className={styles.votes}>
                    VOTES: {item.value}
                </div>
            </div>
        </button>
        <div className={
            isOpen
            ?
            styles.body + ' ' + styles.open 
            :
            styles.body
        }>
            <div className={styles.bodyText}>
                {item.description}
            </div>
            <div className={styles.dates}>
                <div className={styles.date}>
                Voting Start - {item.start}
                </div>
                <div className={styles.date}>
                Voting End - {item.end}
                </div>
                
                <div className={styles.date}>
                The Great Burn - {item.burn}
                </div>
            </div>
            <div className={styles.action}>
                <div className={styles.actionLabel}>
                    Add your voice
                </div>
                <button 
                onClick={openVoteModal}
                className={styles.actionBtn}>
                    Contribute a vote 
                </button>
            </div>
        </div>
    </div>
    <hr className={styles.line}/>
    </>
  )
}

export default VoteItem
