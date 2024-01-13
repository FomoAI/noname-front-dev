import { useState, useEffect } from "react";
import {
  getNoNameNFTBalance,
  getNoNameNFTStakedBalance,
  stackeNFTprePool,
} from "../../smart/initialSmartMain";
import Info from "../../assets/components/info/Info";
import UsdcStaking from "../../assets/components/usdcStaking/UsdcStaking";
import TokenStaking from "../../assets/components/tokenStaking/TokenStaking";
import StakeCard from "../../assets/components/stakeCard/StakeCard";
import StakingStatistics from "../../assets/components/stakingStatistics/StakingStatistics";
import RewardsCard from "../../assets/components/rewardsCard/RewardsCard";
import StakingTable from "../stakingTable/StakingTable";
import DashboardFilters from "../../assets/components/dashboardFilters/DashboardFilters";
import BorrowItem from "../../assets/components/borrowItem/BorrowItem";
import styles from "../styles/staking.module.scss";

const borrowItems = [
  {
    img: "/img1.jpg",
    title: "Newcoin",
    type: "Business",
    status: "Open",
    smart: "0x4657...47h5",
    floorPrice: "0.00 ETH",
    utilization: "0%",
    valuation: "$20,0K",
    APY: "2%",
    totalBorrowed: "$30,0K",
    loansIssued: "1039",
    activeStatus: "borrow",
    isGrow: true,
    changeValue: "21%",
  },
  {
    img: "/img1.jpg",
    title: "Portal",
    type: "Business",
    status: "Open",
    smart: "0x4657...47h5",
    floorPrice: "0.00 ETH",
    utilization: "0%",
    valuation: "$20,0K",
    APY: "2%",
    totalBorrowed: "$30,0K",
    loansIssued: "1039",
    activeStatus: "borrow",
    isGrow: false,
    changeValue: "51%",
  },
  {
    img: "/img1.jpg",
    title: "De.fi",
    type: "Business",
    status: "Open",
    smart: "0x4657...47h5",
    floorPrice: "0.00 ETH",
    utilization: "0%",
    valuation: "$20,0K",
    APY: "2%",
    totalBorrowed: "$30,0K",
    loansIssued: "1039",
    progress: "21%",
    activeStatus: "active",
    isGrow: true,
    changeValue: "21%",
  },
];

const filters = [
  {
    name: "Staking NFT`s",
    value: "nftsStaking",
    isOpen: true,
  },
  {
    name: "Token staking",
    value: "tokenStaking",
    isOpen: true,
  },
  {
    name: "USDC staking",
    value: "usdcStaking",
    isOpen: true,
  },
];

export default function StakingBlock({
  tokens,
  isClaim,
  isClamed,
  poolId,
  projects,
  project,
}) {
  const [selectedFilter, setSelectedFilter] = useState("nftsStaking");
  const [nftsValue, setNftsValue] = useState(0);
  const [availableNfts, setAvailableNfts] = useState(0);
  const [isStake, setIsStake] = useState(false);
  const [stakedNfts, setStakedNfts] = useState(0);
  const [loadingStake, setLoadingStake] = useState(false);

  const filterHandler = (filter) => {
    setSelectedFilter(filter.value);
  };

  const confirmNftStake = async () => {
    setLoadingStake(true);

    const { success } = await stackeNFTprePool(poolId, nftsValue);

    setIsStake(success);
    setStakedNfts(nftsValue);
  };

  const getUserNftsStake = async (address) => {
    let isStake = false;
    let stakeCount = 0;

    const { sum, success } = await getNoNameNFTStakedBalance(address);

    if (!success) return { isStake, stakeCount };

    isStake = sum > 0;
    stakeCount = sum;

    return { isStake, stakeCount };
  };

  const getCurrentSection = () => {
    if(selectedFilter === 'tokenStaking') return <TokenStaking/>

    if(selectedFilter === 'usdcStaking') return <UsdcStaking/>
  };

  useEffect(() => {
    const address = window.ethereum.selectedAddress;

    const getNftsInfo = async () => {
      const { isStake, stakeCount } = await getUserNftsStake(address);

      if (isStake) {
        setIsStake(isStake);
        setStakedNfts(stakeCount);
      }

      const { sum, success } = await getNoNameNFTBalance(address);

      if (!success) return;

      setAvailableNfts(sum);
      setNftsValue(sum);
    };

    const stakingData = async () => {
      await getNftsInfo();
    };

    stakingData();
  }, []);

  return (
    <>
      <div className={styles.body}>
        <Info
          text={"Stake your NFT, tokens and USDC, Earn Rewards!"}
          title={"Staking"}
        />
        <StakingStatistics />
        <DashboardFilters
          filters={filters}
          selectedFilter={selectedFilter}
          filterHandler={filterHandler}
        />

        {
          selectedFilter === 'nftsStaking' 
          ?
          <div className={styles.sectionWrapper}>
            <div className={styles.nftsTitle}>
              Stake your Noname NFT so as to be ready to invest
            </div>
            <div className={styles.nftsStaking}>
              <div className={styles.cards}>
                <StakeCard
                  confirmNftStake={confirmNftStake}
                  nfts={availableNfts}
                  handler={setNftsValue}
                  value={nftsValue}
                />
                <RewardsCard
                  tokens={tokens}
                  isClaim={isClaim}
                  isClamed={isClamed}
                  project={project}
                  poolId={poolId}
                />
              </div>
            <div className={styles.table}>
              <StakingTable items={projects} />
            </div>
            </div>
          </div>
          :
          <></>
        }
        {
          getCurrentSection()
        }
                    <div className={styles.loansWrapper}>
            <div className={styles.loansInfo}>
              <Info
                text={
                  'Loan is a contractual agreement between NONAME and a borrower, set for a definite "duration" or "term". During this term, the borrower is obligated to make the scheduled payments until the loan is fully repaid.'
                }
                title={"My loans"}
              />
            </div>
            <div className={styles.loanItems}>
              {borrowItems.map((item, index) => {
                return <BorrowItem key={index} item={item} isAuth={true} />;
              })}
            </div>
            </div>
      </div>
    </>
  );
}
