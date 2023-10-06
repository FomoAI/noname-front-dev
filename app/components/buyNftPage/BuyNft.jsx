import { useState } from 'react'  
import Image from 'next/image'
import Link from 'next/link'
import manSvg from '../../assets/icons/man.svg'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import NftDetails from '../../assets/components/nftDetails/NftDetails'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import nftImage from '../../assets/img/nft-image.png'
import loader from '../../utils/loader'
import styles from '../styles/buy-nft.module.scss'

export default function BuyNft({nft}) {
  const [isCustomAlert,setIsCustomAlert] = useState(false)
  const [isSuccessBuy,setIsSuccessBuy] = useState(false)

  const [isMakeOrder,setIsMakeOrder] = useState(false)
  const [isBuyAccess,setIsBuyAccess] = useState(false)
  const [orderValue,setOrderValue] = useState(0)
  const [name,id] = nft?.nftTitle?.split('#') 

  const confrimValue = () => {
    setIsMakeOrder(false)
    setIsBuyAccess(true)
  }

  const buyNft = () => {
    setIsSuccessBuy(true)
    setIsCustomAlert(true)   
    setIsBuyAccess(false)
    setOrderValue(0)
  }

  return (
    <>
    <div className={styles.body}>
      <div className={styles.links}>
        <Link
        className={styles.link}
        href={'/marketplace'}
        >
        NFT Marketplace {'>'}
        </Link>
        <div
        className={styles.currentNft}
        >
        {nft?.name}
        </div>
      </div>    
      <div className={styles.main}>
        <div className={styles.img}>
          <img src={loader(nft.nftImg)} alt={'nft image'}/>
        </div>      
        <div className={styles.info}>
          <div className={styles.creator}>
            <Image src={manSvg} alt='creator img'/>
            <span>John Doe</span>
          </div>
          <div className={styles.nftInfo}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
              {name}
              </h1>
              <div className={styles.nftId}>
              #{id || '-'}
              </div>
            </div>
            <div className={styles.bio}>
              <span>Bio: </span>
              {nft.nftDescription}
            </div>
          </div>
          <div className={styles.buyBlock}>
            <div className={styles.buyInfo}>
              <img src={loader(nft.nftImg)} alt='img'/>
              <div className={styles.buyDetails}>
                <div className={styles.buyNftName}>
                  <span>Listed on </span>No name
                </div>
                <div className={styles.buyPrice}>
                  {nft.price} ETh
                </div>
              </div>
            </div>  
            <div className={styles.buyBtns}>
              <SquareBtn
              handler={buyNft}
              disabled={!isBuyAccess}
              type='red'
              width='190'
              height='48'
              text={'Buy'}
              />
              {
                isMakeOrder
                ?
                <div className={styles.makeOrderWrapper}>
                  <input
                  type='number'
                  onChange={(e) => setOrderValue(e.target.value)}
                  value={orderValue}
                  placeholder={'0'}
                  />
                  <button 
                  disabled={orderValue <= 0}
                  onClick={confrimValue}
                  className={styles.confirmBtn}>
                  Confirm
                  </button>
                </div>
                :
                <SquareBtn
                handler={() => setIsMakeOrder((prev) => !prev)}
                width='190'
                height='48'
                text={'+ Make order'}
                />
              }
            </div>
          </div>
          <div className={styles.nftDetailsDesktop}>
            <NftDetails nft={nft}/>
          </div>
        </div>
      </div>
      <div className={styles.nftDetailsMobile}>
        <NftDetails nft={nft}/>
      </div>
    </div>
    <CustomAlert 
    isVisible={isCustomAlert}
    type={isSuccessBuy ? 'success' : 'error'}
    title={isSuccessBuy ? 'Success!' : 'Opps!'}
    text={
      isSuccessBuy 
      ? 
      `You have successfully become a member of No name. Congratulations!`
      :
      `Error occuried. Try again or contact the support.`
    }
    handler={() => setIsCustomAlert(false)}
    />
    </>

  )
}
