import styles from '../../styles/users.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import blockUser from '../../services/adminServices/blockUser'
import { useCallback, useMemo, useState } from 'react'
import {useRouter} from 'next/router'
import {AiOutlineDownload} from 'react-icons/ai'
import getUsersData from '../../services/adminServices/getUsersData'
import deleteUser from '../../services/adminServices/deleteUser'
import Input from '../../UI/Input'
import arrow from '../../../assets/icons/arrow-rotate.svg'
import Image from 'next/image'

export default function UsersTable({users}) {
    const [selectModal,setSelectModal] = useState(false)
    const [selectValue,setSelectValue] = useState('wallet')
    const [filter,setFilter] = useState('')
    const router = useRouter()
    
    const block = useCallback( async (id) => {
        const {success,user} = await blockUser(id)
        if(success){
            router.reload()
        }else{
            alert('Error')
        }
    },[users])

    const deleteConfirm = useCallback( async (id) => {
        const {success} = await deleteUser(id)

        if(!success) return

        router.reload()
    },[users])

    const downloadData = async () => {
        await getUsersData()
        router.push('https://noname-backend-production.up.railway.app/api/static/users.xlsx')
    }

    const filteredUsers = useMemo(() => {
        if(!filter){
            return users
        }

        const checkSelectValue = (value) => {
            switch (value) {
                case 'email':
                    return 'KYC'
                case 'wallet':
                    return 'address'
                case 'discord':
                    return 'discordData'
                default:
                    break;
            }
        }

        return users.filter((user) => {
            const type = checkSelectValue(selectValue)
            if(selectValue === 'discord' && !user.discordData){
                return false
            }
            if(selectValue === 'discord' && user.discordData?.username){
                return user[type].username.toLowerCase().includes(filter.toLowerCase())
            }
            return user[type].toLowerCase().includes(filter.toLowerCase())
        })
    },[users,filter,selectValue])

    const inputHandler = (name,value) => {
        setFilter(value)
    }

    const selectHandler = (event) => {
        if(event.target.id){
            setSelectValue(event.target.id)
            setSelectModal(false)
        }
    }

  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.title}>
                <h2>Users</h2>
            </div>
            <button onClick={downloadData} className={styles.download}>
                <AiOutlineDownload />
            </button>
        </div>
        <div className={styles.filter}>
            <Input
            value={filter}
            handler={inputHandler}
            label={'Search user'}
            />
           <div className={styles.select}> 
                <button onClick={() => setSelectModal((state) => !state)} className={styles.selectModalBtn}>
                    <div>Search by: <strong>{selectValue}</strong></div>
                    <Image src={arrow} alt='arrow'/>
                </button>
                {
                    selectModal
                    ?
                    <div onClick={(e) => selectHandler(e)} className={styles.selectList}>
                        <button id='wallet'>Wallet</button>
                        <button id='email'>Email</button>
                        <button id='discord'>Discord</button>
                    </div>
                    :
                    <></>
                }
           </div>
        </div>
        <div className={styles.table}>
            {
                filteredUsers.map((user) => {
                    return (
                        <div key={user._id}>
                        <div  className={styles.user}>
                            <SquareBtn
                            handler={() => deleteConfirm(user._id)}
                            width='100'
                            text={'Delete'}
                            />
                            <SquareBtn
                            handler={() => block(user._id)}
                            width='100'
                            text={user.blocked ? 'Unblock' : 'Block'}
                            />
                            <div className={styles.item}>
                            <div className={styles.key}>
                                    ID:
                                </div>
                                <div className={styles.value}>
                                    {user._id}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    Status:
                                </div>
                                <div className={styles.value}>
                                    {user.blocked 
                                    ?
                                    <span className={styles.red}>Blocked</span>
                                    :
                                    <span className={styles.green}>Active</span>
                                    }
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    Connected wallet:
                                </div>
                                <div className={styles.value}>
                                    {user.address}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    Balance:
                                </div>
                                <div className={styles.value}>
                                    {user.balance}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    KYC:
                                </div>
                                <div className={styles.value}>
                                    {user.KYC ? user.KYC : '-'}
                                </div>
                            </div>
                            
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    Discord:
                                </div>
                                <div className={styles.value}>
                                    {user.discordData ? user.discordData.username : '-'}
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.key}>
                                    Multi-chain wallets:
                                </div>
                                {
                                user.multichainwallets?.length
                                ? 
                                <div className={styles.wallets}>
                                   {user.multichainwallets.map((wallet) => {
                                        return (
                                            <div key={wallet.label} className={styles.walletData}>
                                                <div className={styles.label}>
                                                    {wallet.label}
                                                </div>
                                                <div className={styles.walletValue}>
                                                    {wallet.value ? wallet.value : '-'}
                                                </div>
                                            </div>
                                        )
                                   })} 
                                </div>
                                : 
                                '-'
                                }
                            </div>
                        </div>
                        <hr className={styles.line}/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
