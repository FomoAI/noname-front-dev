import Image from 'next/image'
import creatorImg from '../../../../icons/man.svg'
import styles from './info.module.scss'

export default function Info({nft}) {
  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.title}>
                Creator
            </div>
            <div className={styles.creator}>
                <Image src={creatorImg} alt='creator image' />
                <span>John Doe</span>
            </div>
        </div>
        <div className={styles.items}>
                <div className={styles.item}>
                    <hr className={styles.line}/>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Contact address</span>
                        <span className={styles.value}>0x5f465df4f6...165df</span>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Token ID</span>
                        <span className={styles.value}>54989</span>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemRow}>
                        <span className={styles.key}>Token standart</span>
                        <span className={styles.value}>ERC-721</span>
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
