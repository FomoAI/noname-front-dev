import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../modal/Modal'
import { closeModal, closeModalWithoutBlock,openModal, openModalWithoutBlock, toggleModal, toggleModalWithoutBlock } from '../../../store/slices/modalsSlice'
import FirstStep from './steps/FirstStep'
import SecondStep from './steps/SecondStep'
import NftAlert from './steps/NftAlert'
import ThirdStep from './steps/ThirdStep'
import FourthStep from './steps/FourthStep'
import { setUserData } from '../../../store/slices/authSlice'
import CustomAlert from '../CustomAlert/CustomAlert'
import AccessToNonameDao from '../AccessNonameDao/AccessToNonameDao'

const checkSteps = (steps) => {
  return Object.values(steps).some((value) => value)
}

export default function SuccessWalletConnect({userData}) {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.modals.successConnect.state)
  const loginResult = useSelector((state) => state.modals.loginResult.state)
  const [isSuccessAuth,setIsSuccessAuth] = useState(false)
  const [steps,setSteps] = useState({
    firstStep:false,
    secondStep:false,
    nftAlert:false,
    thirdStep:false,
    fourthStep:false,
    fifthStep:false
  })

  const modalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      dispatch(toggleModal('successConnect'))
    }
  }

  const alertHandler = () => {
    dispatch(toggleModalWithoutBlock('loginResult'))
  }

  const stepsHanlder = (stepNumber) => {
    // Check nft access
    // stepNumber === 2 && userData.isNftAccess

    if(stepNumber === 2 && true){
      setSteps((prev) => {
        return {...prev,firstStep:false,secondStep:true}
      })
    }

    // if(stepNumber === 2 && !userData.isNftAccess){
    //   setSteps((prev) => {
    //     return {...prev,firstStep:false,nftAlert:true}
    //   })
    //   dispatch(openModal('loginResult'))
    //   setIsSuccessAuth(false)
    // }

    if(stepNumber === 3) { 
      setSteps((prev) => {
        return {...prev,nftAlert:false,secondStep:false,thirdStep:true}
      })

      dispatch(closeModalWithoutBlock('loginResult'))
    }

    if(stepNumber === 4 && !userData.isNftAccess){
      setSteps((prev) => {
        return {...prev,fourthStep:false,fifthStep:true}
      })
      
      dispatch(closeModal('successConnect'))
      
      localStorage.removeItem('connectWalletStep')
      
      dispatch(setUserData({...userData,isAuth:true}))

      setTimeout(() => {
        // dispatch(openModal('nonameDao'))
        dispatch(openModalWithoutBlock('loginResult'))
        setIsSuccessAuth(true)
      },150)
      
    }

    if(stepNumber === 4 && userData.isNftAccess){
      dispatch(closeModal('successConnect'))

      localStorage.removeItem('connectWalletStep')

      dispatch(setUserData({...userData,isAuth:true}))
    }
  }

  useEffect(() => {
    const isDiscordConnected =     
    localStorage.getItem('connectWalletStep') === '4' 
    && 
    userData.discordData
  
    if(userData.isAuth){
      dispatch(closeModal('successConnect'))
      return
    }

    if(isDiscordConnected){
      setSteps((prev) => {
       return {...prev,firstStep:false,fourthStep:true}
      }) 

      setIsSuccessAuth(true)

      dispatch(openModal('successConnect'))

      dispatch(toggleModalWithoutBlock('loginResult'))
    }else{
      userData?.address && setSteps({
        firstStep:true,
        secondStep:false,
        nftAlert:false,
        thirdStep:false,
        fourthStep:false,
        fifthStep:false
      })
      dispatch(closeModalWithoutBlock('loginResult'))
    }
  },[userData])

  return (
    checkSteps(steps)
    ?
    <>
    <Modal width='440' title='Connect wallet' isVisible={isVisible} handler={modalHandler}>
        <FirstStep steps={steps} stepHandler={stepsHanlder} userData={userData}/>
        <SecondStep steps={steps} stepHandler={stepsHanlder} userData={userData}/>
        <NftAlert steps={steps} stepHandler={stepsHanlder} userData={userData}/>
        <ThirdStep steps={steps} stepHandler={stepsHanlder} userData={userData}/>
        <FourthStep steps={steps} stepHandler={stepsHanlder} userData={userData}/>
    </Modal>
    <CustomAlert
    handler={alertHandler}
    isVisible={isVisible && loginResult}
    type={isSuccessAuth ? 'success' : 'error'}
    title={isSuccessAuth ? 'Login souccessful!' : 'You don`t have a NFT Key!'}
    text={isSuccessAuth ? 'You have successfully logged in.' : 'To get access please buy a No name NFT!'}
    />
    </>
    :
    <></>
  )
}
