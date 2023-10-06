import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import MetaMaskImage from '../../../img/metaMask.svg'
import smartCopy from '../../../icons/smart-copy.svg'
import styles from '../success-connect.module.scss'
import { closeModal, openModal, toggleModal } from '../../../../store/slices/modalsSlice'
import sliceAddress from '../../../../utils/sliceAddress'
import DiscordImage from '../../../img/metaMask.svg'

export default function FirstStep({steps,stepHandler,userData}) {
  const dispatch = useDispatch()
  const isVisible = steps.firstStep

  return (
        isVisible
        ?
        <div className={styles.firstStep}>
        <div className={styles.body}>
          <Image alt='meta mask' src={MetaMaskImage}/>
          <div className={styles.subTitle}>
            Connected
          </div>
          <div className={styles.wallet}>
            <span>{sliceAddress(userData?.address) || '-'}</span>
            <Image src={smartCopy} alt='icon'/>
          </div>
        </div>
        <SquareBtn 
        handler={() => stepHandler(2)}
        btnId='none'
        text={'Sign Message'} 
        width='400' 
        type='red'/>
      </div>
      :
      <></>

  )
}
