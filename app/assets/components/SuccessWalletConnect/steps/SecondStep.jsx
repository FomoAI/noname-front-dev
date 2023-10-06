import Image from 'next/image'
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import styles from '../success-connect.module.scss'
import discordImage from '../../../img/discord.svg'

export default function SecondStep({steps,stepHandler,userData}) {
  const isVisible = steps.secondStep

  return (
    isVisible
    ?
      <div className={styles.secondStep}>
        <div className={styles.discordBody}>
          <Image className={styles.discord} src={discordImage} alt='discord'/>
          <div className={styles.subTitle}>
          Connect Discord
          </div>
        </div>
        <SquareBtn 
        handler={() => stepHandler(3)}
        btnId='none'
        text='Login' 
        width='400' 
        type='red'/>
      </div>
    :
    <></>
  )
}
