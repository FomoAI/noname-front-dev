import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import CustomAlert from '../../CustomAlert/CustomAlert'
import addReferral from '../../../../services/addReferral'
import getUserData from '../../../../utils/getUserData'
import getInviterInfo from '../../../../utils/getInviterInfo'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import smartCopy from '../../../icons/smart-copy.svg'
import styles from '../success-connect.module.scss'
import discordImage from '../../../img/discord.svg'

export default function FourthStep({steps,stepHandler,userData}) {
  const [isRefActive,setIsRefActive] = useState(false)
  const isVisible = steps.fourthStep
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userData)


  const confirmAuthHandler = async () => {
    stepHandler(4)
    const inviter = getInviterInfo()
    const referral = getUserData()

    if(inviter?.user?.address || referral.address){
      const {success} = await addReferral(inviter?.user?.address,referral.address)
      setIsRefActive(success)
    }

  }

  return (
    isVisible
    ?
      <>
      <div className={styles.thirdStep}>
        <div className={styles.discordBody + ' ' + styles.success}>
          <Image className={styles.discord} src={discordImage} alt='discord'/>
          <div className={styles.subTitle}>
          Discord connected
          </div>
          <div className={styles.wallet}>
            <span>{userData?.discordData?.username}</span>
            <Image src={smartCopy} alt='icon'/>
          </div>
        </div>
        <SquareBtn 
        handler={confirmAuthHandler}
        btnId='none'
        text='Login to No Name' 
        width='400' 
        type='red'/>
      </div>
      <CustomAlert
      isVisible={isRefActive}
      isAutoClose={true}
      handler={() => setIsRefActive(false)}
      title={'Referral link activated!'}
      text={'The reward will be awarded to the inviter after your investment.'}
      type='success'
      />
      </>
    :
    <></>
  )
}
