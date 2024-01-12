import { useState } from 'react'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import UsdcList from './usdcList/UsdcList'
import CustomCheckbox from '../../../components/UI/inputs/CheckBox'
import styles from './usdc-staking.module.scss'

const depositItems = [
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'active',
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'active',
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'ended',
    },
]

const activeItems = [
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'deposit',
        duration:'12 Months'
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'deposit',
        duration:'12 Months'
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'deposit',
        duration:'12 Months'
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'deposit',
        duration:'12 Months'
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'deposit',
        duration:'12 Months'
    },
]

const endedItems = [
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'ended',
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'ended',
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'ended',
    },
    {
        vault:'12-Month Vault',
        amount:'1000 USDC',
        apy:'10%',
        status:'ended',
    },
]

const UsdcStaking = () => {
    const [isAll,setIsAll] = useState(true)
    const [isLive,setIsLive] = useState(false)
    const [isEnded,setIsEnded] = useState(false)

  return (
    <div className={styles.wrapper}>
        <div className={styles.body}>
            <div className={styles.filters}>
            <div className={styles.filter}>
                <CustomCheckbox
                isChecked={isAll}
                handler={setIsAll}
                />
                <span>All</span>
            </div>
            <div className={styles.filter}>
                <CustomCheckbox
                isChecked={isLive}
                handler={setIsLive}
                />
                <span>Live</span>
            </div>
            <div className={styles.filter}>
                <CustomCheckbox
                isChecked={isEnded}
                handler={setIsEnded}
                />
                <span>Ended</span>
            </div>
            </div>
            <div className={styles.lists}>
                <UsdcList
                title={'Deposit'}
                subTitle={'Your active pool'}
                items={depositItems}
                />
                <UsdcList
                title={'Active pool'}
                subTitle={'Stake your USDC so as to be rewards!'}
                items={activeItems}
                />
                <UsdcList
                title={'History stake'}
                subTitle={'History of your past pools'}
                items={endedItems}
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
                        0.00 
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <SquareBtn
                        width='400'
                        text={'Claim'}
                        handler={() => {}}
                        />
                    </div>
        </div>
    </div>
  )
}

export default UsdcStaking
