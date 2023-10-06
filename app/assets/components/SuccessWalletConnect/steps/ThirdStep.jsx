import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import MetaMaskImage from '../../../img/metaMask.svg'
import smartCopy from '../../../icons/smart-copy.svg'
import { closeModal, openModal, toggleModal } from '../../../../store/slices/modalsSlice'
import sliceAddress from '../../../../utils/sliceAddress'
import discordImage from '../../../img/discord.svg'
import { discordRedirectLink } from '../../../../config/api'
import styles from '../success-connect.module.scss'

export default function ThirdStep({steps,stepHandler,userData}) {
  const isVisible = steps.thirdStep
  const router = useRouter()

  const connectDiscordHandler = () => {
    router.push(discordRedirectLink)
  }

  return (
    isVisible
    ?
      <div className={styles.thirdStep}>
        <div className={styles.discordBody + ' ' + styles.success}>
          <Image className={styles.discord} src={discordImage} alt='discord'/>
          <div className={styles.subTitle}>
          Connect Discord
          </div>
        </div>
        <SquareBtn 
        handler={connectDiscordHandler}
        btnId='none'
        text='Login' 
        width='400' 
        type='red'/>
      </div>
    :
    <></>
  )
}
