import Image from 'next/image'
import StakingChart from './chart/StakingChart'
import NonameImg from '../../img/dashboard-nn.png'
import styles from './staking-stat.module.scss'

const StakingStatistics = () => {
  return (
    <div className={styles.body}>
        <div className={styles.chart}>
            <StakingChart/>
        </div>
        <div className={styles.card}>
            <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>
                    Total Value Locked
                </div>
                <div className={styles.cardValue}>
                    $376,904.2
                </div>
                <div className={styles.cardNfts}>
                    1615 NFT key
                </div>
            </div>
            <div className={styles.cardImg}>
                <Image src={NonameImg} alt='NoName'/>
            </div>
        </div>
    </div>
  )
}

export default StakingStatistics
