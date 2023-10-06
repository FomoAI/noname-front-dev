import { useState, useEffect } from 'react'
import { 
  getNoNameNFTBalance,
  getNoNameNFTStakedBalance,
  stackeNFTprePool,
  getUserInvestInfoEndedPool,
  getMeInPool,
} from '../../smart/initialSmartMain'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import Info from '../../assets/components/info/Info'
import styles from '../styles/staking.module.scss'
import StakeCard from '../../assets/components/stakeCard/StakeCard'
import RewardsCard from '../../assets/components/rewardsCard/RewardsCard'
import StakingTable from '../stakingTable/StakingTable'
import Loader from '../../assets/components/loader/Loader'

const stakingItems = [
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:false,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim','Recd'],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
  {
    pool:'BREED',
    Amount:'$1.8M',
    status:true,
    investDate:'18 Nov, 2022 23:45',
    unlockDate:'20 Nov, 2022 23:45',
    action:['Claim',],
    locked:'$1000.00',
    claimed:'$1000.00'
  },
]

export default function StakingBlock({tokens,isClaim,isClamed,poolId,projects,project}) {
  const [nftsValue,setNftsValue] = useState(0)
  const [availableNfts,setAvailableNfts] = useState(0)
  const [availableRewards,setAvailableRewards] = useState(0)
  const [lockedRewards,setLockedRewards] = useState(0)
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
    
    const getRewardsData = async () => {
      const {success,data} = await getUserInvestInfoEndedPool(poolId,window.ethereum.selectedAddress)
      
      const responce = await getMeInPool(poolId,address)
      
      if(!success) return

      setLockedRewards(responce.data.invest)
      setAvailableRewards(data.invest)
    }

    const stakingData = async () => {
      await getNftsInfo()

      if(!poolId) return

      await getRewardsData()
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
            estimated={lockedRewards} 
            available={availableRewards}/>
        </div>
        <div className={styles.table}>
          <StakingTable items={projects}/>
        </div>
    </div>
    </>
  )
}
