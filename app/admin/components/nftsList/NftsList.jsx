import loader from '../../../utils/loader'
import styles from '../../styles/nfts-list.module.scss'

export default function NftsList({nfts}) {
  return (
    <div className={styles.body}>
        {
            nfts.map((nft) => {
                return (
                    <div key={nft._id} className={styles.nft}>
                        <img
                        className={styles.nftImage} 
                        src={loader(nft.image)}
                        alt={nft.name} />
                        <div className={styles.nftInfo}>
                            <div className={styles.infoItem}>
                                <div className={styles.key}>
                                    Name:
                                </div>
                                <div className={styles.value}>
                                    {nft.name}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}
