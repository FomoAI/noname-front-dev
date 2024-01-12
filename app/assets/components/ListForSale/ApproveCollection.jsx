import Image from 'next/image'
import loader from '../../../utils/loader'
import nftImg from '../../../assets/img/img1.jpg'
import styles from './list-for-sale.module.scss'


export default function ApproveCollection({nft,handler}) {

  return (
    <div className={styles.approveNft}>
    <div className={styles.approveNftWrapper}>
        <img 
        className={styles.approveNftImg}
        src={nft.image} 
        alt='nft-img'
        />
        <div className={styles.approveNftInfo}>
            <div className={styles.approveNftTitle}>
                {nft.name}
            </div>
            <div className={styles.approveNftDescription}>
                {nft.type}
            </div>
        </div>
    </div>
    <div className={styles.approveNftText}>
    <span>Go to your wallet</span>
        <div>
        You'll be asked to approve this collection from your wallet. 
        You only need to approve each collection once.
        </div>
    </div>
</div>
  )
}
