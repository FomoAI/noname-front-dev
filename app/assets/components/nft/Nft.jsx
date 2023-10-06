import { useEffect,useState } from "react";
import { getNoNameNFTBalance, getNoNameNFTStakedBalance,stackeNFTprePool,getTotalStakeInPool} from '../../../smart/initialSmartMain'
import LoadingModal from "../LoadingModal/LoadingModal";
import CustomAlert from "../CustomAlert/CustomAlert";
import Modal from "../modal/Modal";
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import Loader from '../../components/loader/Loader'
import getTime from "../../../utils/getTime";
import styles from "./nft.module.scss";

export default function Nft({ card, dates , project}) {
  const [nftsValue,setNftsValue] = useState(0)
  const [availableNfts,setAvailableNfts] = useState(0)
  const [isStake,setIsStake] = useState(false)
  const [stakedNfts,setStakedNfts] = useState(0)
  const [totalStaked,setTotalStaked] = useState(0)
  const [loadingStake,setLoadingStake] = useState(false)
  const [loadingPage,setLoadingPage] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  
  const confirmNftStake = async () => {
    setLoadingStake(true)

    const {success} = await stackeNFTprePool(project.poolId,nftsValue)

    if(success){
      setIsSuccess(true)
      setIsStake(true)
      setStakedNfts(nftsValue)
    }

    setLoadingStake(false)
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
    const getNftsInfo = async () => {
      setLoadingPage(true)
      const address = window.ethereum.selectedAddress
  
      const {isStake,stakeCount} = await getUserNftsStake(address)

      if(isStake){
        setIsStake(isStake)
        setStakedNfts(stakeCount)
      }

      const {sum,success} = await getNoNameNFTBalance(address)

      if(!success) return

      setAvailableNfts(sum)
      setNftsValue(sum)
      setLoadingPage(false)

      const {totalStaked} = await getTotalStakeInPool(project.poolId)
      setTotalStaked(totalStaked)
    }
    getNftsInfo()
  },[])

  if(loadingPage){
    return <Loader/>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dates}>
        <div className={styles.date}>
            <span>Starts: </span>
            <span>{getTime(dates.start)} {dates.timeStart}</span>
        </div>
        <div className={styles.date}>
            <span>Ends: </span>
            <span>{getTime(dates.end)} {dates.timeEnd}</span>
          </div>
      </div>
    <div className={styles.nft}>
      <div className={styles.nftTitle}>Enter the desired quantity of NFTs ({availableNfts})</div>
      <div className={styles.nftBody}>
        <div className={styles.nftRow}>
          <div className={styles.nftColum}>
            <input
            placeholder="3"
            type="number"
            className={styles.nftsInput}
            onChange={(e) => setNftsValue(e.target.value)}
            value={nftsValue}
            />
            <div className={styles.nftText}>
              <span>Total staked in this pool: </span>
              <span>{totalStaked}</span>
            </div>
          </div>
          {
            isStake
            ?
            <div className={styles.nftStakedInfo}>
              <div className={styles.nftText}>
                <span>Current amount of NFTs staked: </span>
                <span>{stakedNfts}</span>
              </div>
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div>
      <SquareBtn 
      handler={confirmNftStake} text={'Stake'} width={'548'}/>
      <Modal
      handler={() => setLoadingStake(false)}
      isVisible={loadingStake}
      >
      <LoadingModal
      title={'Confirm Staking'}
      subTitle={'Staking Noname NFT key'}
      description={'Confirm this transaction in your wallet'}
      />
      </Modal>
      <CustomAlert
      type="success"
      title={'Success!'}
      text={`You stake ${nftsValue} nfts`}
      isVisible={isSuccess}
      isAutoClose={true}
      handler={() => setIsSuccess(false)}
      />
    </div>
  );
}



