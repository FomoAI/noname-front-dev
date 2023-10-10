import { useState, useEffect } from 'react'
import { 
  getNoNameNFTBalance,
  getNoNameNFTStakedBalance,
  stackeNFTprePool,
} from '../../smart/initialSmartMain'
import Info from '../../assets/components/info/Info'
import styles from '../styles/staking.module.scss'
import StakeCard from '../../assets/components/stakeCard/StakeCard'
import RewardsCard from '../../assets/components/rewardsCard/RewardsCard'
import StakingTable from '../stakingTable/StakingTable'

export default function StakingBlock({tokens,isClaim,isClamed,poolId,projects,project}) {
  const [nftsValue,setNftsValue] = useState(0)
  const [availableNfts,setAvailableNfts] = useState(0)
  const [isStake,setIsStake] = useState(false)
  const [stakedNfts,setStakedNfts] = useState(0)
  const [loadingStake,setLoadingStake] = useState(false)
  
  const confirmNftStake = async () => {
    setLoadingStake(true)
    
    const {success} = await stackeNFTprePool(poolId,nftsValue)

    setIsStake(success)
    setStakedNfts(nftsValue)
  }

  const getUserNftsStake = async (address) => {
    let isStake = false 
    let stakeCount = 0

    const {sum,success} = await getNoNameNFTStakedBalance(address)
    
    if(!success) return {isStake,stakeCount}

    isStake = sum > 0
    stakeCount = sum

    return {isStake,stakeCount}
  }

  useEffect(() => {
    const address = window.ethereum.selectedAddress

    const getNftsInfo = async () => {
      const {isStake,stakeCount} = await getUserNftsStake(address)

      if(isStake){
        setIsStake(isStake)
        setStakedNfts(stakeCount)
      }

      const {sum,success} = await getNoNameNFTBalance(address)
   
      if(!success) return

      setAvailableNfts(sum)
      setNftsValue(sum)
    }
    
    const stakingData = async () => {
      await getNftsInfo()
    }

    stakingData()
  },[])

  return (
    <>
    <div className={styles.body}>
      <Info text={'Stake your Noname NFT so as to be ready to invest'} title={'Staking'}/>
        <div className={styles.cards}>
            <StakeCard 
            confirmNftStake={confirmNftStake}
            nfts={availableNfts}
            handler={setNftsValue}
            value={nftsValue}/>
            <RewardsCard 
            tokens={tokens}
            isClaim={isClaim}
            isClamed={isClamed}
            project={project}
            poolId={poolId}
            />
        </div>
        <div className={styles.table}>
          <StakingTable items={projects}/>
        </div>
    </div>
    </>
  )
}
