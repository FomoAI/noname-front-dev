import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import styles from '../success-connect.module.scss'
import nftAlert from '../../../img/error.png'

export default function FifthStep({steps,stepHandler,userData}) {
  
  return (
        <div className={styles.firstStep}>
        <div className={styles.body + ' ' + styles.nftAlert}>
          <Image alt='meta mask' src={nftAlert}/>
          <div className={styles.subTitle + ' ' + styles.nftText}>
          You don't have a No name NFT Key!
          </div>
        </div>
        <div className={styles.buttons}>
        <SquareBtn 
        text={'Buy on No name'} 
        width='440' 
        type='red'/>
        </div>
      </div>
  )
}
