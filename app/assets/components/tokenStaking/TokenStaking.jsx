import useModal from '../../../hooks/useModal'
import TokenModal from '../tokenModal/TokenModal'
import RewardsHistory from '../rewardsHistory/RewardsHistory'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from './token-staking.module.scss'

const rewHistory = [
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
    {
        amount:1000,
        stakeDate:'18 Nov, 2022 23:45',
        unlockDate:'20 Nov, 2022 23:45',
        rewards:1000,
        apy:'10%'
    },
]

const TokenStaking = () => {
    const {state,modalHandler} = useModal()

  return (
    <>
    <div className={styles.body}>
        <div className={styles.title}>
            Stake your NAME tokens to get the highest APY!
        </div>
        <div className={styles.cards}>
            <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <div className={styles.cardColumn}>
                            <div className={styles.stakeLabel}>
                                You staked
                            </div>
                            <div className={styles.description}>
                                Enter the desired quantity of NAME tokens
                            </div>
                        </div>
                        <div className={styles.cardColumn}>
                            <div className={styles.stakeValue}>
                                0.00 NAME
                            </div> 
                            <div className={styles.apyLabel}>
                                APY  25%
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardValue}>
                        <input type='number' value={0}/>
                    </div>
                    <div className={styles.actions}>
                        <SquareBtn
                        width='195'
                        text={'Unstake'}
                        handler={() => {}}
                        />
                        <SquareBtn
                        width='195'
                        type='red'
                        text={'Stake'}
                        handler={() => modalHandler('',true)}
                        />
                    </div>
            </div>
            <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <div className={styles.cardColumn}>
                            <div className={styles.stakeLabel}>
                            Rewards
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardValueWrapper}>
                        <div className={styles.cardValueLabel}>
                        Available rewards 
                        </div>
                        <div className={styles.cardValue}>
                        0.00 NAME
                        </div>
                    </div>
                    <div className={styles.action + ' ' + styles.claimAction}>
                        <SquareBtn
                        width='400'
                        text={'Claim'}
                        handler={() => {}}
                        />
                    </div>
            </div>
        </div>
        <RewardsHistory rewHistory={rewHistory}/>
    </div>
    <TokenModal
    isVisible={state}
    modalHandler={modalHandler}
    />
    </>
  )
}

export default TokenStaking
