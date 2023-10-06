import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import smartCopy from '../../../icons/smart-copy.svg'
import styles from '../success-connect.module.scss'
import { closeModal, openModal, toggleModal } from '../../../../store/slices/modalsSlice'
import sliceAddress from '../../../../utils/sliceAddress'
import nftAlert from '../../../img/error.png'

export default function NftAlert({steps,stepHandler,userData}) {
  const isVisible = steps.nftAlert

  return (
        isVisible
        ?
        <div className={styles.firstStep}>
        <div className={styles.body + ' ' + styles.nftAlert}>
          <Image alt='meta mask' src={nftAlert}/>
          <div className={styles.subTitle + ' ' + styles.nftText}>
          You don't have a No name NFT Key!
          </div>
        </div>
        <div className={styles.buttons}>
        <SquareBtn 
        handler={() => stepHandler(3)}
        btnId='none'
        text={'Ok, сontinue'} 
        width='190' 
        />
        <SquareBtn 
        handler={() => stepHandler(3)}
        btnId='none'
        text={'Buy NFT'} 
        width='190' 
        type='red'/>
        </div>
      </div>
      :
      <></>

  )
}
