import { useState } from 'react'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import Modal from '../modal/Modal'
import CustomRangeInput from '../customRangeInput/RangeInput'
import styles from './token-modal.module.scss'

const VoteModal = ({isVisible,modalHandler}) => {
    const [nftsValue,setNftsValue] = useState(0)

  return (
    <Modal
    isVisible={isVisible}
    handler={modalHandler}
    width='360'
    title='Stake NAME'
    >
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.headItem}>
                    Locked for: 
                </div>
                <div className={styles.headValue}>
                    12 months
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
                <div className={styles.walletValue}>
                Wallet: 0 name
                </div>
                <div className={styles.votes}>
                    <div className={styles.votesLabel}>
                    Est APR :
                    </div>
                    <div className={styles.votesNumber}>
                    116%
                    </div>
                </div>
                <SquareBtn
                width='340'
                type='red'
                text={'Approve'}
                />
            </div>
        </div>
    </Modal>
  )
}

export default VoteModal
