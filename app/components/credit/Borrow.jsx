import Lottie from "lottie-react";
import BorrowBody from "../borrowBody/BorrowBody";
import CreditLineAnim from '../../assets/lotties-animations/CreditLines.json'
import ClosedPageLabel from '../../assets/components/closedPageLabel/ClosedPageLabel';
import styles from '../styles/borrow.module.scss'

const Borrow = ({isOpen,isCreditLine}) => {
  return (
    isOpen
    ?
    <div className={styles.body}>
        {
          isCreditLine
          ?
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <h1 className={styles.title}>
                Borrow
              </h1>
              <div className={styles.description}>
              Credit is usually earned, but on the blockchain, all you need is NFTs as collateral.
              </div>
            </div>
            <BorrowBody/>
          </div>
          :
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <h1 className={styles.title}>
                Borrow
              </h1>
              <div className={styles.description}>
              Credit is usually earned, but on the blockchain, all you need is NFTs as collateral.
              </div>
            </div>
            <div className={styles.creditLinesAlert}>
              <div className={styles.creditLinesAlertTitle}>
                Credit Lines
              </div>
              <div className={styles.creditLinesAlertDescription}>
                You do not have any credit lines. To borrow funds from the pool, you need a NONAME credit line.
              </div>
              <div className={styles.creditLinesAlertAnim}>
                <Lottie animationData={CreditLineAnim}/>
              </div>
            </div>
          </div>
        }
    </div>
    :
    <ClosedPageLabel
    text={'Borrow'}
    label={'Soon'}
    description={'Credit is usually earned, but on the blockchain, all you need is NFTs as collateral.'}
    />
  )
}

export default Borrow;
