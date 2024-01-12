import styles from './rew-his.module.scss'

const RewardsHistory = ({rewHistory}) => {

  return (
    <>
    <div className={styles.title}>
        Rewards history
    </div>
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.headItem}>
            Amount of tokens
            </div>
            <div className={styles.headItem}>
            Stake Date
            </div>
            <div className={styles.headItem}>
            Unlock Date
            </div>
            <div className={styles.headItem}>
            Rewards
            </div>
            <div className={styles.headItem}>
            APY
            </div>
        </div>
        <div className={styles.items}>
            {
                rewHistory.map((item,index) => {
                    return (
                        <div className={styles.wrapper}>
                            <div className={styles.item} key={index}>
                                <div className={styles.proposal}>
                                    {item.amount}
                                </div>
                                <div className={styles.value}>
                                    {item.stakeDate} 
                                </div>
                                <div className={styles.value}>
                                    {item.unlockDate} 
                                </div>
                                <div className={styles.value}>
                                    {item.rewards} 
                                </div>
                                <div className={styles.value}>
                                    {item.apy} 
                                </div>
                            </div>
                             <hr className={styles.itemLine}/>
                        </div>

                    )
                })
            }
        </div>
    </div>
    </>
  )
}

export default RewardsHistory
