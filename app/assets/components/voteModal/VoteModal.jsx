import { useState } from 'react'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import Modal from '../modal/Modal'
import CustomRangeInput from '../customRangeInput/RangeInput'
import styles from './vote-modal.module.scss'

const VoteModal = ({isVisible,modalHandler}) => {
    const [nftsValue,setNftsValue] = useState(0)

  return (
    <Modal
    isVisible={isVisible}
    handler={modalHandler}
    width='360'
    title='Vote'
    >
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.headItem}>
                    You have: 10 NFT = 10 Votes 
                </div>
                <div className={styles.headItem}>
                    Enter the desired quantity of NFTs 
                </div>
            </div>
            <CustomRangeInput
            />
            <div className={styles.inputWrapper}>
                <BlueInput
                placeholder='0'
                value={nftsValue}
                handler={(e) => setNftsValue(e.target.value)}
                />
                <button className={styles.maxBtn}>
                    Max
                </button>
            </div>
            <div className={styles.bottom}>
                <div className={styles.votesNumber}>
                Number of votes on this issue: 10 708
                </div>
                <SquareBtn
                width='340'
                type='red'
                text={'Contribute a vote'}
                />
            </div>
        </div>
    </Modal>
  )
}

export default VoteModal
