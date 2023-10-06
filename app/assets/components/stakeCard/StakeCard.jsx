import { useState } from 'react'
import { stackeNFTprePool } from '../../../smart/initialSmartMain'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Modal from '../modal/Modal'
import StakeModal from '../stakeModal/StakeModal'
import blockScroll from '../../../utils/blockScroll'
import styles from './stake-card.module.scss'

export default function StakeCard({value,nfts,handler,confirmNftStake}) {

  return (
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.column}>
              <span>You staked</span>
              <div className={styles.stakeLabel}>
                Enter the desired quantity of NFTs
              </div>
            </div>
            <span>{nfts} Noname NFT key</span>
        </div>
        <div className={styles.valueBlock}>
            <input
            type='number'
            className={styles.valueInput}
            value={value}
            onChange={(e) => {
              const newValue = e.target.value 
              
              if(Number(newValue) > Number(nfts)) return

              handler(newValue)
            }}
            />
        </div>
        <div className={styles.btns}>
           <SquareBtn type='red' handler={confirmNftStake} width={'410'} text={'Stake'}/>
        </div>
    </div>
  )
}
