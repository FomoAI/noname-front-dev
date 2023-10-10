import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Nft from '../nft/Nft'
import PurchaseData from '../purchaseData/PurchaseData'
import ClaimData from '../claimData/ClaimData'
import { useRouter } from 'next/router'
import getTime from '../../../utils/getTime'
import styles from './participate-card.module.scss'

const getCurrentDate = (index,project) => {
    const values = {
        0:{
            start:project.dateStart,
            end:project.dateEnd,
            timeStart:project.timeStart,
            timeEnd:project.timeEnd,
        },
        1:{
            start:project.purchaseDates.from,
            end:project.purchaseDates.to,
            timeStart:project.purchaseTimeStart,
            timeEnd:project.purchaseTimeEnd,
            greenTime:project.greenTime,
            greenTimeStart:project.greenTimeStart,
            yellowTime:project.yellowTime,
            yellowTimeStart:project.yellowTimeStart,
        },
        2:{
            start:project.distributionStart,
            timeStart:project.claimTimeStart,
        },
    }

    return values[index]
}

export default function ParticipateCard({
        project,claimValue,
        card,index,
        resetCard
    }) {
        
    const router = useRouter()
    const dates = getCurrentDate(index,project)

  return (
        <>
        {
            card.state
            ?
            <div className={styles.body}>
                <div className={styles.number}>
                    {index + 1}
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {card.title}
                    </div>
                </div>
                <div className={styles.cardInfo}>
                    {
                        card.nft 
                        ?
                        <Nft 
                        project={project}
                        dates={dates}
                        card={card} 
                        />
                        :
                        <></>
                    }
                    {
                        card.purchase 
                        ?
                        <PurchaseData 
                        dates={dates}
                        project={project}
                        />
                        :
                        <></>
                    }
                   {
                    card.claim
                    ?
                    <ClaimData 
                    resetCard={resetCard}
                    claimValue={claimValue}
                    project={project}
                    card={card}/>
                    :
                    <></>
                   }
                </div>
            </div>
            :
            <div className={styles.bodyDisabled}>
                <div className={styles.number + ' ' + styles.disabledNumber}>
                    {index + 1}
                </div>
                <div className={styles.info}>
                    <div className={styles.title + ' ' + styles.disabled}>
                        {card.title}
                    </div>
                    <div className={styles.dates + ' ' + styles.disabled}>
                        <div className={styles.date}>
                            <span>Starts: </span>
                            <span>{getTime(dates.start)} {dates.timeStart}</span>
                        </div>
                        {
                            index === 2
                            ?
                            <></>
                            :
                            <div className={styles.date}>
                                <span>Ends: </span>
                                <span>{getTime(dates.end)} {dates.timeEnd}</span>
                            </div>
                        }
                    </div>
                    {
                        card?.error
                        ?
                        <div>
                            <div className={styles.error}>{card.error}</div>
                            <SquareBtn handler={() => router.push('/portfolio')} text={card.btnName} width={'548'}/>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        }

        </>
  )
}
