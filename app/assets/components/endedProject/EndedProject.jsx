import { useEffect, useState } from 'react'
import { getPoolInfo, getMeInPool, getAllPartnersFromPool} from '../../../smart/initialSmartMain'
import { RefundInfo } from '../refundInfo/RefundInfo'
import LoaderCustom from '../loader/Loader'
import Image from 'next/image'
import loader from '../../../utils/loader'
import styles from  './ended.module.scss'

export default function EndedProject({project}) {
    const [loading,setLoading] = useState(false)
    const [investValue,setInvestValue] = useState(0)
    const [sumInvestValue,setSumInvestValue] = useState(0)
    const [participants,setParticipants] = useState(0)

    useEffect(() => {
      if(!window.ethereum.selectedAddress || !project.poolId) return

      const getProjectInfo = async () => {
        setLoading(true)

        const {response,success} = await getPoolInfo(project.poolId)

        const {data} = await getMeInPool(project.poolId,window.ethereum.selectedAddress)

        const {sumInvest,participants} = await getAllPartnersFromPool(project.poolId)

        setSumInvestValue(sumInvest)
        setParticipants(participants)
        setInvestValue(data.invest)

        setLoading(false)
      }

      getProjectInfo()
    },[])
    
    if(loading){
      return <LoaderCustom/>
    }

    if(!project){
        return <></>
    }

  return (
    <div className={styles.body}>
      <div className={styles.info}>
        <div className={styles.img}>
            <Image loader={() => loader(project.img)} width={'64'} height={'64'} src={project.img} alt={'project-img'}/>
        </div>
        <div className={styles.title}>
            {project.title} - Unlimited Sale
        </div>
        <div className={styles.description}>
          Participation in this project is closed. Stay tuned! Once the tokens are available, the claiming period begins.
        </div>
      </div>
      {
        project?.isRefunded 
        ?
        <RefundInfo/>
        :
        <div className={styles.card}>
          <div className={styles.cardTitle}>
          Sale completed successfully
          </div>
          <div className={styles.cardItem}>
              <span className={styles.cardKey}>Your investment</span>
              <span className={styles.cardTitle}>{investValue} USDC</span>
          </div>
          <div className={styles.cardItem}>
              <span className={styles.cardKey}>Participants</span>
              <span className={styles.cardTitle}>{participants}</span>
          </div>
          <div className={styles.cardItem}>
              <span className={styles.cardKey}>Total Sales</span>
              <span className={styles.cardTitle}>{sumInvestValue} USDC</span>
          </div>
        </div>
      }

    </div>
  )
}
