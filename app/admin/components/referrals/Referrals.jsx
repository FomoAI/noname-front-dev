import { useState,useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {AiOutlineDownload,AiFillDelete} from 'react-icons/ai'
import { api } from '../../../config/api'
import RefData from '../referralsData/RefData'
import createReferral from '../../services/refServices/createReferral'
import deleteRefItem from '../../services/refServices/deleteRefItem'
import closeSvg from '../../../assets/icons/close.svg'
import Input from '../../UI/Input'
import SquareLightBtn from '../../../components/UI/buttons/SquareLightBtn'
import getReferralsJson from '../../services/refServices/getReferralsJson'
import getReferrals from '../../services/refServices/getReferrals'
import Loader from '../../../assets/components/loader/Loader'
import styles from '../../styles/ref.module.scss'

export default function Referrals() {
    const [newRefData,setNewRefData] = useState({inviter:'',referrals:['']})
    const [isNewRef,setIsNewRef] = useState(false)
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const downloadRefData = async () => {
        try{
            const {success,path} = await getReferralsJson()

            if(success){
                router.push(`${api}/api/static/${path}`)
            }else{
                alert('Download error')
            }            
        }catch(error){
            console.log(error)   
            alert('Download error: ' + error)
        }
    }

    const addRefItem = useCallback(() => {
        setNewRefData((prev) => {
            return (
                {
                    ...prev,
                    referrals:[...prev.referrals,'']
                }
            )
        })
    },[newRefData])

    const removeRefItem = useCallback((indexToRemove) => {
        setNewRefData((prev) => {
            return (
                {
                    ...prev,
                    referrals:prev.referrals.filter((ref,index) => indexToRemove !== index)
                }
            )
        })
    },[newRefData])

    const inputHandler = useCallback((value,refIndex) => {
        setNewRefData((prev) => {
            return (
                {
                    ...prev,
                    referrals:prev.referrals.map((ref,index) => {
                        if(index === refIndex){
                            return value
                        }

                        return ref
                    })
                }
            )
        })
    },[newRefData])

    const saveNewRef = async () => {
        setLoading(true)

        const {success,item} = await createReferral(newRefData)

        setLoading(false)

        if(!success) return 

        setData((prev) => {
            return [...prev,item]
        })
        setIsNewRef(false)
        setNewRefData({inviter:'',referrals:[]})
    }

    const confirmDelete = async (id) => {
        setLoading(true)

        const {success} = await deleteRefItem(id)

        setLoading(false)

        if(!success) return

        setData((items) => {
            return items.filter((item) => item._id !== id)
        })
        
    }

    useEffect(() => {
        getReferrals().then(({success,items}) => {
            if(success){
                setData(items)
            }
        })
    },[])

    if(loading) return <Loader/>

  return (
    <div className={styles.body}>
        <button 
        onClick={downloadRefData}
        className={styles.downloadJson}>
            <AiOutlineDownload/>
        </button>
        <h2 className={styles.title}>
            Referrals list:
        </h2>
        <RefData/>
        <div className={styles.table}>
            {
                data.map((item,index) => {
                    return (
                        <div className={styles.tableItem} key={item._id}>
                            <button 
                            onClick={() => confirmDelete(item._id)}
                            className={styles.deleteItemBtn}>
                                <AiFillDelete/>
                            </button>
                            <div className={styles.inviter}>
                                <span className={styles.key}>Inviter: </span>
                                <span className={styles.value}>{item.inviter}</span>
                            </div>
                            <div className={styles.referrals}>
                                <div className={styles.referralsTitle}>
                                    Referrals:
                                </div>
                                {
                                    item.referrals.map((referral,index) => {
                                        return (
                                            <div className={styles.refItemWrapper} key={index}>
                                                <span className={styles.number}>
                                                    {index + 1}.
                                                </span>
                                                <span>{referral}</span>
                                            </div>
                                        )
                                    })
                                }                                            
                            </div>
                        </div>
                    )
                })
            }
            {
                isNewRef
                ?
                <div className={styles.newRef}>
                    <div 
                    className={styles.saveBtn}>
                        <SquareLightBtn
                        handler={() => setIsNewRef(false)}
                        text={'Cancel'}
                        />
                        <SquareLightBtn
                        handler={saveNewRef}
                        text={'Save'}
                        />
                    </div>
                    <div className={styles.newRefTitle}>
                        <Input 
                        handler={(name,value) => setNewRefData((prev) => {
                            return (
                                {
                                    ...prev,
                                    [name]:value
                                }
                            )
                        })}
                        label={'Inviter:'}
                        name={'inviter'}
                        placeholder='0x0bb8f9686368a12ed34332e50a7b3be0e25e3a14'
                        value={newRefData.inviter}
                        />
                    </div>
                    <div className={styles.newRefItems}>
                        <div className={styles.newRefItemLabel}>
                            Referrals:
                        </div>
                        {
                            newRefData.referrals.map((item,index) => {
                                return (
                                    <div className={styles.newRefItem} key={index}>
                                        <Input
                                        name={'refitem'}
                                        handler={(name,value) => inputHandler(value,index)}
                                        placeholder='0x2bc7213ec3a6eaed6b853d29a84f8fe5481642a2'
                                        value={item}
                                        />
                                        <button
                                        onClick={() => removeRefItem(index)}
                                        >
                                            <Image src={closeSvg} alt='remove ref'/>
                                        </button>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.newRefAddBtn}>
                            <SquareLightBtn
                            handler={addRefItem}
                            text={"+"}
                            width='300'
                            />
                        </div>
                    </div>
                </div>
                :
                <div className={styles.tableBtn}>
                    <SquareLightBtn
                    text={'+'}
                    height='80'
                    width='2200'
                    handler={() => setIsNewRef(true)}
                    />
                </div>
            }
        </div>
    </div>
  )
}
