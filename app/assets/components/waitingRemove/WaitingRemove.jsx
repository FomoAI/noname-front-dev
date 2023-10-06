import Image from 'next/image'
import Modal from '../modal/Modal'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from './wt-remove.module.scss'
import loader from '../../../utils/loader'

export default function WaitingRemove({remove,state,handler,nft}) {
    if(!nft){
        return <></>
    }

  return (
    <Modal handler={handler} isVisible={state}>
        <div className={styles.body}>
            <div className={styles.img}>
                <Image loader={() => loader(nft.img)} width={'64'} height={'64'} src={nft.img} alt={'nft'}/>
            </div>
            <div className={styles.title}>
                {nft.title}
            </div>
        </div>
        <SquareBtn handler={() => remove(nft)} text={'Remove'} width={'330'}/>
    </Modal>
  )
}
