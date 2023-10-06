import { useState, useEffect } from "react";
import { Claim } from "../../../smart/initialSmartMain";
import updateUser from '../../../services/updateUser'
import setIsClaim from "../../../utils/setIsClaim";
import getTime from "../../../utils/getTime";
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import LoadingModal from '../../components/LoadingModal/LoadingModal'
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import styles from "./claim-data.module.scss";

export default function ClaimData({ project,card,claimValue,resetCard}) {
  const [isSuccess,setIsSuccess] = useState(false)
  const [loading,setLoading] = useState(false)

  const confirmClaim = async () => {
    setLoading(true)

    const {success} = await Claim(project.poolId,window.ethereum.selectedAddress)

    setLoading(false)

    if(!success) return

    const claimData = setIsClaim(project)
    resetCard()
    setIsSuccess(success)
    await updateUser({claims:claimData})
  }

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.dates}>
        <span>Distribution starts: {getTime(project.distributionStart)} {project.claimTimeStart}</span>
        <span>Times for claim your tokens</span>
      </div>
      <div className={styles.body}>

        <div className={styles.title}>Sale has ended</div>
        <div className={styles.info}>
          <span className={styles.key}>Claimable share</span>
          <span className={styles.value}>{card.claim}</span>
        </div>
        <div className={styles.claimValue}>
          {claimValue} {project.title} token
        </div>
      </div>
      <SquareBtn handler={confirmClaim} text={card.btnName} width={'548'}/>
    </div>
    <CustomAlert
    type={'success'}
    title={'Claimed!'} 
    text={`You have successfully claim your tokens`}
    isVisible={isSuccess}
    handler={() => setIsSuccess(false)}
    />
    {
      loading
      ?
      <LoadingModal
      title={'Confirm claim!'}
      subTitle={'Confirming...'}
      />
      :
      <></>
    }
    </>
  );
}
