import Modal from '../modal/Modal'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import CustomRangeInput from '../customRangeInput/RangeInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from './borrow-modal.module.scss'

const BorrowModal = ({isVisible,modalHandler}) => {
  return (
    <Modal
    width='362'
    overflowY='auto'
    bodyClass='borrowModal'
    title={'Borrow'}
    isVisible={isVisible}
    handler={modalHandler}
    >
        <div className={styles.body}>
          <div className={styles.head}>
            Select NFTs and their quantity for collateral
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
              <label 
              htmlFor={'collectionName'}
              >
              Сollection name  
              </label> 
              <BlueInput 
              placeholder='Name your collection'
              id={'collectionName'}/>
            </div>
            <div className={styles.inputWrapper}>
              <label 
              htmlFor={'nftsQuanity'}
              >
              NFTs name and their quantity
              </label> 
              <BlueInput
              placeholder='NFTs name and their quantity'
              id={'nftsQuanity'}/>
            </div>
          </div>
          <div className={styles.nft}>
            <div className={styles.nftTitle}>
              + Secret NFT Key #2
            </div>
            <div className={styles.nftDetails}>
              No name key
            </div>
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
              <label 
              htmlFor={'valNfts'}
              >
              Valuing your NFTs  
              </label> 
              <BlueInput 
              placeholder='0.00 USDC'
              id={'valNfts'}/>
            </div>
            <hr className={styles.inputsLine}/>
            <div className={styles.inputWrapper}>
              <label 
              htmlFor={'borrowAmmount'}
              >
              Borrow amount
              </label> 
              <BlueInput 
              placeholder='0.00 USDC'
              id={'borrowAmmount'}/>
            </div>
          </div>

          <div className={styles.loanWrapper}>
            <div className={styles.loanTitle}>
              Loan to value
            </div>
            <div className={styles.loanRecommended}>
              <span>Recommended</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4.2 8L7.8373 0.5L0.562693 0.5L4.2 8Z" fill="#738094" fill-opacity="0.5"/>
              </svg>
            </div>
            <div className={styles.loanLiquidation}>
              <span>Liquidation</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4.2 8L7.8373 0.5L0.562693 0.5L4.2 8Z" fill="#738094" fill-opacity="0.5"/>
              </svg>
            </div>
            <div className={styles.customRangeInput}>
              <CustomRangeInput/>
            </div>
            <div className={styles.loanMax}>
              <div className={styles.arrowRotate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4.2 8L7.8373 0.5L0.562693 0.5L4.2 8Z" fill="#738094" fill-opacity="0.5"/>
                </svg>
              </div>
              <span>Max</span>
            </div>
          </div>

          <div className={styles.statistics}>

            <div className={styles.statisticsItem}>
              <div className={styles.statisticsKey}>
                Current LTV:
              </div>
              <div className={styles.statisticsValue}>
                4%
              </div>
            </div>

            <div className={styles.statisticsItem}>
              <div className={styles.statisticsKey}>
                Max LTV:
              </div>
              <div className={styles.statisticsValue}>
                25%
              </div>
            </div>

            <div className={styles.statisticsItem}>
              <div className={styles.statisticsKey}>
                Liquidation LTV:
              </div>
              <div className={styles.statisticsValue}>
                54%
              </div>
            </div>

          </div>

          <SquareBtn
          width='340'
          fontSize='16px'
          type='red'
          text={'Get USDC'}
          />

        </div>
    </Modal>
  )
}

export default BorrowModal;
