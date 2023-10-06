import styles from './claim-modal.module.scss'
import StakingTable from '../../../components/stakingTable/StakingTable'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
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

  
export default function ClaimModal() {
  return (
    <div id='claim-modal' className={styles.body}>
      <StakingTable boxShadow='none' height={'300'} items={stakingItems}/> 
      <div className={styles.btn}>
       <SquareBtn text={'Claim All'} width={'867'}/>
      </div>
    </div>
  )
}
