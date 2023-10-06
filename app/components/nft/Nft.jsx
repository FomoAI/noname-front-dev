import loader from '../../utils/loader'
import { useRouter } from 'next/router'
import { useSelector,useDispatch } from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import useCart from '../../hooks/useCart'
import styles from '../styles/nft.module.scss'


export default function     Nft({collectionIndex,toggleShowAllBtn,nft}) {
    const [name,id] = nft.name.split('#') 
    const isAuth = useSelector((state) => state.auth.userData.isAuth)
    const dispatch = useDispatch()
    const router = useRouter()
    const {addToCart} = useCart()

    const openConnectWallet = () => {
        dispatch(toggleModal('wallet'))
    }

    const navigateToCollection = () => {
        router.push(`/marketplace/nft/${nft._id}`)        
    }

    const rarity = nft?.attributes?.find((attr) => {
        return attr?.trait_type?.toLowerCase() === 'rarity'
    })

  return (
    <div
    onMouseEnter={toggleShowAllBtn ? () => toggleShowAllBtn('over') : () => {}}
    onMouseLeave={toggleShowAllBtn ? () => toggleShowAllBtn('out') : () => {}}
    className={styles.body + ' ' + 'nft-body'}>
        <img 
        onClick={navigateToCollection}
        className={styles.nftImage}
        src={loader(nft.image)} 
        alt='nft image'/>
        <div 
        onClick={navigateToCollection}
        className={styles.label}>
            {rarity?.value ? rarity?.value : 'RARE'}
        </div>
        <div 
        onClick={navigateToCollection}
        className={styles.id}>
           {id ? `#${id}` : '-'}
        </div>
        <div className={styles.info}>
            <div className={styles.title}>
                {name}
            </div>
            <div className={styles.row}>
                <div className={styles.item}>
                    <div className={styles.key}>
                        Price:
                    </div>
                    <div className={styles.value}>
                        {
                        nft.price 
                        ?
                        `${nft.price}`
                        :
                        '-'
                        }
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.key}>
                    Floor price:
                    </div>
                    <div className={styles.value}>
                        {nft.floorPrice || '-'}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.key}>
                        Your share:
                    </div>
                    <div className={styles.value}>
                    {nft.share || '-'}
                    </div>
                </div>
            </div>
            <div id='nft-buttons' className={styles.buttons}>
                {
                    isAuth
                    ?
                    <div className={styles.actions}>
                        <button
                        onClick={() => addToCart(nft)}
                        className={styles.btnRed}
                        >
                            By now
                        </button>
                        <button
                        onClick={() => addToCart(nft)}
                        className={styles.btn}
                        >To cart </button>
                    </div>
                    :
                    <button 
                    className={styles.btn}
                    onClick={openConnectWallet}
                    >
                        Connect wallet

                    </button>
                }

        </div>
        </div>
    </div>
  )
}
