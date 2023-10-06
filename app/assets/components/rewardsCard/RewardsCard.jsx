import { useState, useEffect } from 'react'
import { getPoolInfo, Claim } from '../../../smart/initialSmartMain'
import updateUser from '../../../services/updateUser'
import setIsClaim from '../../../utils/setIsClaim'
import checkIsClaim from '../../../utils/checkIsClaim'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Modal from '../modal/Modal'
import ClaimModal from '../claimModal.jsx/ClaimModal'
import blockScroll from '../../../utils/blockScroll'
import styles from './rewards-card.module.scss'

export default function RewardsCard({poolId,project}) {
    const [isClaim,setIsClaimValue] = useState(true)
    const [isClamed,setIsClaimed] = useState(false)
    const [tokens,setTokens] = useState('0')

    const claimHandler = async () => {
      const {success} = await Claim(poolId,window.ethereum.selectedAddress)
      if(success){
        setIsClaimed(success)
        const claimData = setIsClaim(project)
        await updateUser(claimData)
      }
    }
    useEffect(() => {
      if(!poolId) return

      if(project?._id){
        setIsClaimed(checkIsClaim(project._id)?.isAlreadyClaim)
      }

      getPoolInfo(poolId).then(({response}) => {
        setIsClaimValue(response.isClaim)
        setTokens(response.claimed)
      })
    },[])

  return (
    <div className={styles.body}>
    <div className={styles.row}>
        <span>Rewards</span>
    </div>
    <div className={styles.colums}>
        <div className={styles.valueBlock}>
            <div className={styles.key}>Available rewards 
            {
            project?.title 
            ? 
            ` (${project?.title}` 
            + 
            ' tokens)' 
            : ' (tokens)'
            }
            </div>
            <div className={styles.value}>
              {
                isClamed
                ?
                '0'
                :
                tokens || 0
              }
            </div>
        </div>
    </div>
    <div className={styles.btns}>
       <SquareBtn 
       disabled={!isClaim || isClamed}
       handler={
        claimHandler
      } width={'406'} text={
        isClamed
        ?
        'Claimed'
        :
        'Claim'
        }/>
    </div>
</div>
  )
}
