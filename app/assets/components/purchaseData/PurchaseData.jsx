import { useState, useEffect, useMemo } from 'react'
import { getUserInZone, getUserCanInvest, getMeInPool } from '../../../smart/initialSmartMain'
import { approveSum, investSum } from '../../../smart/initialSmartMain'
import addProjectToUser from '../../../services/addProjectToUser'
import CustomAlert from '../CustomAlert/CustomAlert'
import LoadingModal from '../LoadingModal/LoadingModal'
import parseDate from '../../../utils/parseDate'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import addDateAndTime from '../../../utils/addDateAndTime'
import getUserStatusByIndex from '../../../utils/getUserStatusByIndex'
import Loader from '../loader/Loader'
import getTime from '../../../utils/getTime'
import styles from './purchase-data.module.scss'
import Modal from '../modal/Modal'

export default function PurchaseData({project,participate,approve,dates}) {
    const [userStatus,setUserStatus] = useState('red')
    const [value,setValue] = useState(0)
    const [isTransactionLoading,setIsTransactionLoading] = useState()
    const [loading,setLoading] = useState(false)
    const [isDisabled,setIsDisabled] = useState(false)
    const [isSuccessApprove,setIsSuccessApprove] = useState(false)
    const [isSuccessInvest,setIsSuccessInvest] = useState(false)

    const [isInvestStep,setIsInvestStep] = useState(false)
    const [isUserCanInvest,setIsUserCanInvest] = useState(true)
    const [isCanInvestAlert,setIsCanInvestAlert] = useState(false)

    const [isAlreadyInvested,setIsAlreadyInvested] = useState(false)
    const [alreadyInvestedValue,setAlreadyInvestedValue] = useState(0)

    const datesByStatus = {
        red:{
            start:'-',
            end:'-'
        },
        green: {
            start:`${getTime(project.greenTime)} ${project.greenTimeStart}`,
            end:`${getTime(project.yellowTime)} ${project.yellowTimeStart}`
        },
        yellow:{
            start:`${getTime(project.yellowTime)} ${project.yellowTimeStart}`,
            end:`${getTime(dates.end)} ${dates.timeEnd}`
        },
    } 

    const getUserStatus = async () => {
        setLoading(true)

        const {data,success} 
        = 
        await getUserInZone(project.poolId,window.ethereum.selectedAddress)

        if(!success){
            setLoading(false)
            return 
        }

        const status = getUserStatusByIndex(data)

        if(status === 'red'){
            setIsDisabled(true)
        }

        if(status === 'green'){
            const isDisabled  
            =
            addDateAndTime(parseDate(project.greenTime),project.greenTimeStart)
            >
            new Date().getTime()

            setIsDisabled(isDisabled)
        }

        if(status === 'yellow'){
            const isDisabled  
            =
            addDateAndTime(parseDate(project.yellowTime),project.yellowTimeStart)
            >
            new Date().getTime()

            setIsDisabled(isDisabled)
        }

        setUserStatus(status)

        setLoading(false)
    }

    const confimApprove = async () => {
        setIsTransactionLoading(true)

        let comission = (value * project.comission) / 100

        comission = comission > 0 ? comission : 0

        const {res,success} = await approveSum(Number(value) + comission)
       
        const {isCanInvest} = await getUserCanInvest(project.poolId,window.ethereum.selectedAddress)

        setIsSuccessApprove(success)
        setIsInvestStep(success)
        setIsUserCanInvest(isCanInvest)
        setIsTransactionLoading(false)
    }

    const confimInvest = async () => {
        setIsTransactionLoading(true)

        let comission = (value * project.comission) / 100

        comission = comission > 0 ? comission : 0

        const {success} = await investSum(Number(value),project.poolId,comission)

        if(success){
            await addProjectToUser(window.ethereum.selectedAddress,project._id)
        }
       
        setIsSuccessInvest(success)
        setIsAlreadyInvested(success)
        setAlreadyInvestedValue(Number(value))
        setIsTransactionLoading(false)
    }

    const date = useMemo(() => {
        return datesByStatus[userStatus]
    },[userStatus])

    const isValidValue = useMemo(() => {
        return value >= Number(project.minInvest) && value <=  Number(project.maxInvest)
    },[value])
  
    useEffect(() => {
        const initialPurchaseData = async () => {
            const {data,success} 
            =
            await getMeInPool(project.poolId,window.ethereum.selectedAddress)

            const isInvest = data.invest > 0 && success
            setIsAlreadyInvested(isInvest)
            setAlreadyInvestedValue(data.invest)

            const {isCanInvest}
            =
            await getUserCanInvest(project.poolId,window.ethereum.selectedAddress)

            setIsUserCanInvest(isCanInvest)
            setIsCanInvestAlert(!isCanInvest)

            getUserStatus()
        }

        initialPurchaseData()
    },[])

  return (
    <div className={styles.wrapper}>
        <div className={styles.userStatus}>
            <span>Your status:</span>
            <div className={
                styles.statusColor
                +
                " "
                +
                styles[userStatus]
                }>
            </div>
        </div>
        {
            isAlreadyInvested
            ?
            <div className={styles.investedData}>
                <span>Your investment:</span>
                <div className={styles.investValue}>
                    {alreadyInvestedValue} USDC
                </div>
            </div>
            :
            <></>
        }
    <div className={styles.infoRow}>
        <div className={styles.dates}>
            <div className={styles.date}>
                <span>Starts: </span>
                <span>{date.start}</span>
            </div>
            <div className={styles.date}>
                <span>Ends: </span>
                <span>{date.end}</span>
            </div>
        </div>
        <div className={styles.dates}>
        <div className={styles.date}>
                <span>Min. investment: </span>
                <span>${project?.minInvest || '-'}</span>
            </div>
            <div className={styles.date}>
                <span>Max. investment: </span>
                <span>${project?.maxInvest || '-'}</span>
            </div>
        </div>
    </div>
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.colum}>
                <span className={styles.key}>Enter the desired investment amount (USDC):</span>
                <div className={styles.input}>
                    <input 
                    value={value} 
                    onChange={(e) => {
                        if(!isInvestStep){
                            setValue(e.target.value)
                        }
                    }} 
                    type="number" />
                </div>
            </div>
        </div>
    </div>
    <div className={styles.purchaseBtn}>
        <SquareBtn 
        disabled={isDisabled || !isValidValue || !isUserCanInvest}
        handler={
            isInvestStep
            ?
            confimInvest
            :
            confimApprove
        } 
        text={
            isInvestStep
            ?
            'Purchase'
            :
            'Approve'
        } 
        width={'548'}/>
    </div>
    {
        loading
        ?
        <Loader/>
        :
        <></>
    }
    {
        <Modal
        handler={() => setIsTransactionLoading(false)}
        isVisible={isTransactionLoading}
        >
            <LoadingModal
            title={'Confirm transaction '}
            description={'Confirm this transaction in your wallet'}
            />
        </Modal>
    }
    {
        <CustomAlert
        type='success'
        isVisible={isSuccessApprove}
        title={'Approved!'}
        handler={() => setIsSuccessApprove(false)}
        text={'Click purchase to finish invest'}
        />
    }
    {
        <CustomAlert
        type='success'
        isVisible={isSuccessInvest}
        title={'Invested!'}
        handler={() => setIsSuccessInvest(false)}
        text={'You can claim your tokens after "Purchase" step'}
        />
    }
    {
        <CustomAlert
        type='error'
        isVisible={isCanInvestAlert}
        handler={() => setIsCanInvestAlert(false)}
        title={'You can`t invest!'}
        text={'Your investment time has not yet started/has expired'}
        />
    }
    </div>
  )
}
