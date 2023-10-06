import { useCallback, useState } from 'react'
import Modal from '../modal/Modal'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import updateUser from '../../../services/updateUser'
import Loader from '../loader/Loader'
import Success from '../success/Success'
import styles from './multi.module.scss'

const inputs = [
    {
        label:'Solana',
        value:'',
    },
    {
        label:'Cosmos',
        value:'',
    },
    {
        label:'Near',
        value:'',
    },
    {
        label:'Polkadot',
        value:'',
    },
    {
        label:'Kusama',
        value:'',
    },
]

export default function SupportModal({isVisible,handler,success,setSuccess,userWallets}) {
    const [loading,setLoading] = useState(false)
    const [wallets,setWallets] = useState(() => {
        return userWallets?.length ? userWallets : inputs
    })

    const inputsHandler = useCallback((event,target) => {
        setWallets((state) => state.map((wallet) => {
            if(wallet.label === target){
                return {...wallet,value:event.target.value}
            }
            return wallet
        }))
    },[wallets])

    const saveWallets = async (event) => {
        event.preventDefault()
        setLoading(true)
        const {success} = await updateUser({multichainwallets:wallets})                   
        success && setSuccess(true)
        setLoading(false)  
    }
    
    if(loading){
        return (
            <Loader/>
        )
    }

  return (
   <Modal
   bodyClass="top-modal"
   handler={handler}
   title='Multi-chain wallet'
   isVisible={isVisible}
   >
    {
        success
        ?
        <Success/>
        :
        <form onSubmit={saveWallets} className={styles.body} >
        <div className={styles.description}>
            Enter your wallets address below 
        </div>
        <div className={styles.inputs}>
            {wallets.map((wallet) => (
                <div key={wallet.label} className={styles.wallet}>
                    <span className={styles.key}>
                        {wallet.label}
                    </span>
                    <BlueInput 
                    handler={inputsHandler}
                    id={wallet.label}
                    value={wallet.value}
                    />
                </div>
            )
            )}
        </div>
        <SquareBtn
        btnId='none'
        width='380'
        type='red'
        text={'Save'}
        />
        </form>
    }
   </Modal>
  )
}
