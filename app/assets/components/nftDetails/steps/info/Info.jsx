import Image from 'next/image'
import creatorImg from '../../../../icons/man.svg'
import styles from './info.module.scss'
import sliceAddress from '../../../../../utils/sliceAddress'

export default function Info({nft}) {
    const [name,id] = nft?.nftTitle?.split('#') 

  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.title}>
                Creator
            </div>
            <div className={styles.creator}>
            {
              nft.creatorData?.discordData?.avatar
              ?
              <img src={`https://cdn.discordapp.com/avatars/${nft.creatorData?.discordData?.id}/${nft.creatorData?.discordData?.avatar}?size=24`}/>
              :
              <Image src={creatorImg} alt='creator img'/>
            }
                <span>{nft.creatorData?.discordData?.username}</span>
            </div>
        </div>
        <div className={styles.items}>
                <div className={styles.item}>
                    <hr className={styles.line}/>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Contract address</span>
                        <span className={styles.value}>
                            {sliceAddress(nft.smart)}
                        </span>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Token ID</span>
                        <span className={styles.value}>{id || '-'}</span>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Token standart</span>
                        <span className={styles.value}>{nft.tokenStandart || 'ERC-721'}</span>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Blockchain</span>
                        <span className={styles.value}>zkSync</span>
                    </div>
                    <hr className={styles.line}/>
                </div>
            </div>
    </div>
  )
}
