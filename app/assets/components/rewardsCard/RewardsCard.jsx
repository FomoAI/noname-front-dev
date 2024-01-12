import { useState, useEffect } from 'react'
import { Claim,getUserClaimValue } from '../../../smart/initialSmartMain'
import addClaimToUser from '../../../utils/addClaimToUser'
import checkIsClaim from '../../../utils/checkIsClaim'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import styles from './rewards-card.module.scss'

export default function RewardsCard({poolId,project}) {
    const [isClaim,setIsClaimValue] = useState(true)
    const [isClamed,setIsClaimed] = useState(false)
    const [tokens,setTokens] = useState('0')

    const claimHandler = async () => {
      console.log(poolId,window.ethereum.selectedAddress)
      const {success} = await Claim(poolId,window.ethereum.selectedAddress)

      if(success){
        setIsClaimed(success)
        await addClaimToUser(project._id)
      }
    }
    useEffect(() => {
      if(!poolId) return

      if(project?._id){
        checkIsClaim(project._id).then((value) => {
          setIsClaimed(value?.isAlreadyClaim)
        })
      }

      getUserClaimValue(poolId,window.ethereum.selectedAddress,project._id).then(({isClaim,claimValue,success}) => {
        if(success){
          setIsClaimValue(isClaim)
          setTokens(claimValue)
        }
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
