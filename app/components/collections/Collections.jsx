import { useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { closeModal } from '../../store/slices/modalsSlice'
import Modal from '../../assets/components/modal/Modal'
import Success from '../../assets/components/success/Success'
import LoadingModal from '../../assets/components/LoadingModal/LoadingModal'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import Collection from '../collection/Collection'
import styles from '../styles/collections.module.scss'

export default function Collections({collections}) {
  const [maxCollections,setMaxCollections] = useState(5)
  const isVisible = useSelector((state) => state.modals.buyNft.state)
  const isSuccess = useSelector((state) => state.modals.isBuyNft.state)
  const dispatch = useDispatch()

  const showMoreCollections = () => {
    setMaxCollections(collections.length)
  }
 
  return (
    <>
    <div className={styles.body}>
        {
            collections.slice(0,maxCollections).map((collection,index) => {
                if(!collection.nfts?.length){
                  return <></>
                }
                return (
                    <Collection collection={collection} key={collection._id}/>
                )
            })
        }
        {
          collections.length >= maxCollections
          ?
          <div className={styles.moreBtnWrapper}>
          <button onClick={showMoreCollections} className={styles.moreBtn}>
              More {'>'}
          </button>
          </div>
          :
          <></>
        }

    </div>
    <Modal
    handler={() => dispatch(closeModal('buyNft'))}
    isVisible={isVisible}
    >
        <LoadingModal
        title={'Confirming'}
        />
    </Modal>
    <Modal
    width='600'
    handler={() => dispatch(closeModal('isBuyNft'))}
    isVisible={isSuccess}
    >
        <Success
        text={'You have successfully purchased NFT!'}
        />
    </Modal>
    </>
  )
}
