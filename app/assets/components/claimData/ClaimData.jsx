import { useState, useEffect } from "react";
import { Claim } from "../../../smart/initialSmartMain";
import Modal from '../../../assets/components/modal/Modal'
import updateUser from '../../../services/updateUser'
import addClaimToUser from "../../../utils/addClaimToUser";
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
    if(success){
      setTimeout( async () => {
        resetCard()
        setIsSuccess(success)
        await addClaimToUser(project._id)
      },1000)
    }
    setLoading(false)

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
      <SquareBtn handler={
        confirmClaim
        } 
        text={
          'Claim'
          } 
        width={'548'}/>
    </div>
    <CustomAlert
    position="left"
    type={'success'}
    title={'Claimed!'} 
    text={`You have successfully claim your tokens`}
    isVisible={isSuccess}
    handler={() => setIsSuccess(false)}
    />
      <Modal
      isVisible={loading}
      handler={() => setLoading(false)}
      >
      <LoadingModal
      title={'Confirm claim!'}
      subTitle={'Confirming...'}
      />
      </Modal>
    </>
  );
}
