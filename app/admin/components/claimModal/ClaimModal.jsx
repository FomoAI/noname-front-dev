import { useState, useEffect } from 'react'
import { getAllPartnersFromPool,changeEndedPoolToken } from '../../../smart/initialSmartMain'
import { mainPoolAddress } from '../../../smart/initialSmartMain'
import claimStart from '../../services/adminServices/claimStart'
import createClaim from '../../services/adminServices/createClaim'
import CustomAlert from '../../../assets/components/CustomAlert/CustomAlert'
import Modal from '../../../assets/components/modal/Modal'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Input from '../../UI/Input'
import styles from '../../styles/claim.module.scss'

const inputs = [
    {
        label:'Token:',
        name:'token',
        placeholder:'0x4EeF2A62E8A63b713C96CBADAc4C6622D1EAB948',
        type:'text',
    },
    {
        label:'Decimals:',
        name:'decimals',
        placeholder:'18',
        type:'number',
    },
    {
        label:'Sum invest:',
        name:'sumInvest',
        placeholder:'10000',
        type:'number',
    },
    {
        label:'Sum token:',
        name:'sumToken',
        placeholder:'10000',
        type:'number',
    },
]

export default function ClaimModal({handler,isVisible,project,type}) {
    const [data,setData]= useState({token:'',decimals:18,sumInvest:0,sumToken:0})
    const [isSuccess,setIsSuccess] = useState(false)

    const inputsHanlder = (name,value) => {
        setData((prev) => {
            return {...prev,[name]:value}
        })
    }

    const confirmClaim = async () => {
        if(!data.token) return 

        const types = {
            'donate':'donates',
            'startup':'startups',
            'crypto':'crypto',
            'realestate':'business',
        }

        const currentType = types[type]

        const {success} = await changeEndedPoolToken(
            data.token,project.poolId,
            data.sumToken,
            data.decimals,
            data.sumInvest
        )

        if(success){
            await claimStart(project._id,currentType)

            await createClaim({...data,project:project._id})

            setIsSuccess(success)
        }
        
    }

    useEffect(() => {
        if(!project.poolId) return

        getAllPartnersFromPool(project.poolId).then(({sumInvest}) => {
            setData((prev) => {
                return {...prev,sumInvest}
            })
        })
    },[])

  return (
    <>
        <Modal
    title='Start claim'
    handler={handler}
    isVisible={isVisible}
    >
        <div className={styles.body}>
            <div className={styles.head}>
                <span className={styles.key}>Transfer funds to the smart contract address before confirmation: </span>
                <span className={styles.value}>{mainPoolAddress}</span>
            </div>
            <div className={styles.inputs}>
                {
                    inputs.map((input) => {
                        return (
                            <Input
                            key={input.name}
                            label={input.label}
                            name={input.name}
                            value={data[input.name]}
                            handler={(name,value) => inputsHanlder(name,value)}
                            placeholder={input.placeholder}
                            type={input.type}
                            />
                        )
                    })
                }
            </div>
            <div className={styles.confrim}>
                <SquareBtn
                handler={() => confirmClaim()}
                width='330'
                text={'Confirm'}
                />
            </div>
        </div>
    </Modal>
    <CustomAlert
    isVisible={isSuccess}
    handler={() => setIsSuccess(false)}
    title={'Success!'}
    text={'Сlaim has begun!'}
    type='success'
    />
    </>
  )
}
