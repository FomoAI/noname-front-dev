import { useMemo, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { toggleModal, openModal } from "../../../store/slices/modalsSlice";
import { setUserData } from "../../../store/slices/authSlice";
import { getDateIntervalPrice,getNftIntervalPrice} from "../../../smart/initialSmartNftMarket";
import getCollectionStatistic from '../../../services/getCollectionStatistic'
import getNftStatisticData from '../../../services/getNftStatisticData'
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import favourites from "../../../services/favourites";
import loader from "../../../utils/loader";
import arrowSvg from "../../icons/arrow-rotate.svg";
import heartSvg from "../../icons/heart.svg";
import heartFillSvg from "../../icons/heartFill.svg";
import icons from "../../icons/socialmedia/socialmedia";
import styles from "./collection-info.module.scss";

const timeFilters = ["24H", "7D", "1M", "3M", "1Y"];

export default function CollectionInfo({ collectionData, isNftPage, nftId }) {
  const [selectedFilter, setSelectedFilter] = useState("7D");
  const [isTimeFilter, setIsTimeFilter] = useState(false);
  const [statisticData,setStatisticData] = useState({})
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const router = useRouter();
  const projectData = collectionData.project;
  const priceRangeWrapper = useRef(null);
  const priceRangeBody = useRef(null);
  const maxPriceRef = useRef(null);
  const minPriceRef = useRef(null);

  const isFavourite = user?.favourites?.includes(
    isNftPage ? nftId : collectionData._id
  );

  const changeFilter = (filter) => {
    setSelectedFilter(filter);
    setIsTimeFilter(false);
  };

  const addToFavourites = async () => {
    if (!user.isAuth) {
      dispatch(toggleModal("wallet"));
      return;
    }

    const id = isNftPage ? nftId : collectionData._id;
    let changedFavourites;

    if (isFavourite) {
      changedFavourites = user.favourites.filter((projectId) => {
        return projectId !== id;
      });
    } else {
      changedFavourites = [...user.favourites, id];
    }

    dispatch(setUserData({ ...user, favourites: changedFavourites }));

    const { success } = await favourites(
      id,
      user.address,
      isFavourite ? "remove" : "create"
    );
  };

  const makeOrderHandler = () => {
    if (!user.isAuth) {
      dispatch(openModal("wallet"));
      return;
    }
    router.push(`/nft/${nftId}`);
  };

  useMemo(() => {
    if(!priceRangeWrapper.current || !priceRangeBody.current) return

    if(!isNftPage){
      getCollectionStatistic(collectionData.smart,collectionData._id,selectedFilter,collectionData.supply).then(({data}) => {
        const currentPrice = data.floorPrice
        minPriceRef.current.innerText = `$${data.lowPrice}`

        maxPriceRef.current.innerText = `$${data.maxPrice}`
    
        let width = currentPrice / data.maxPrice * 100

        if(width > 100){
          width = 100
        }

        if(width < 0){
          width = 0
        }

        priceRangeBody.current.style.width = `${width}%`
        
        setStatisticData(data)

      })
    }
    if(isNftPage){
      getNftStatisticData(collectionData.smart,collectionData._id,selectedFilter,collectionData.supply,collectionData.nftSmartId).then(({data}) => {
        const currentPrice = data.floorPrice
        minPriceRef.current.innerText = `$${data.lowPrice}`

        maxPriceRef.current.innerText = `$${data.maxPrice}`
    
        let width = currentPrice / data.maxPrice * 100
        console.log(data)
        if(width > 100){
          width = 100
        }

        if(width < 0){
          width = 0
        }

        priceRangeBody.current.style.width = `${width}%`
        
        setStatisticData(data)

      })
    }

  }, [selectedFilter,collectionData]);
  
  return (
    <div className={styles.body}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.mainInfo}>
            <img
              className={styles.projectImg}
              src={
                isNftPage
                  ? collectionData.nftImg
                  : loader(projectData?.img)
              }
              alt="project image"
            />
            <div className={styles.infoWrapper}>
              <h1 className={styles.title}>
                {isNftPage ? collectionData.nftTitle : projectData.title}
              </h1>
              <div className={styles.descriptionWrapper}>
                <div className={styles.decription}>
                  {isNftPage
                    ? collectionData.nftDescription
                    : projectData.description}
                </div>
                <div className={styles.socialmedia}>
                  {projectData?.socialmedia ? (
                    projectData.socialmedia.map((item) => {
                      return (
                        <a key={item.alt} href={item.link}>
                          <Image src={icons[item.alt]} alt={item.alt} />
                        </a>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={addToFavourites}
              className={styles.favouriteBtnMobile}
            >
              {isFavourite ? (
                <Image src={heartFillSvg} alt="heart" />
              ) : (
                <Image src={heartSvg} alt="heart" />
              )}
            </button>
          </div>
          <div className={styles.priceInfo}>
            <div className={styles.infoItem}>
              <div className={styles.key}>
                {isNftPage ? "NFT price" : "Floor price"}
              </div>
              <div className={styles.value + " " + styles.priceInfoValue}>
                {`$${
                  isNftPage
                  ?
                  Number(collectionData?.nftPrice).toFixed(2)
                  :
                  statisticData?.floorPrice
                }` || "$0"}
              </div>
            </div>
            <div className={styles.priceRange}>
              <div className={styles.priceRangeHead}>
                <div className={styles.key}>
                  {isNftPage ? "NFT price range:" : "Floor price range"}
                </div>
                <div className={styles.timeFilterWrapper}>
                  <button
                    onClick={() => setIsTimeFilter((prev) => !prev)}
                    className={styles.timeFilterBtn}
                  >
                    {isTimeFilter ? (
                      <Image
                        className={styles.rotate}
                        src={arrowSvg}
                        alt="rotate arrow"
                      />
                    ) : (
                      <Image src={arrowSvg} alt="rotate arrow" />
                    )}
                    <span>{selectedFilter}</span>
                  </button>
                  <div
                    className={
                      isTimeFilter
                        ? styles.timeFilterList + " " + styles.visible
                        : styles.timeFilterList
                    }
                  >
                    {timeFilters.map((filter) => {
                      return (
                        <button
                          onClick={() => changeFilter(filter)}
                          key={filter}
                          className={styles.filterItemBtn}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div ref={priceRangeWrapper} className={styles.range}>
                <div ref={priceRangeBody} className={styles.progress}></div>
              </div>
              <div className={styles.priceRangeBottom}>
                <div className={styles.priceRangeItem}>
                  <span className={styles.key}>Low:</span>
                  <span 
                  ref={minPriceRef}
                  className={styles.valueStatistic}>
                    {`$${statisticData?.lowPrice}` || "-"}
                  </span>
                </div>
                <div className={styles.priceRangeItem}>
                  <span className={styles.key}>High:</span>
                  <span 
                  ref={maxPriceRef}
                  className={styles.valueStatistic}>
                    {`$${statisticData?.maxPrice}` || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.details}>
            <div className={styles.infoDetailsItems}>
              <div className={styles.infoItem}>
                <div className={styles.value}>{projectData?.goal || "-"}</div>
                <div className={styles.key}>Total Raised</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.value}>
                  {collectionData?.lastFunding || "-"}
                </div>
                <div className={styles.key}>Last Funding</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.value}>{projectData?.type || "-"}</div>
                <div className={styles.key}>Type</div>
              </div>
            </div>
            <button onClick={addToFavourites} className={styles.favouriteBtn}>
              {isFavourite ? (
                <Image src={heartFillSvg} alt="heart" />
              ) : (
                <Image src={heartSvg} alt="heart" />
              )}
            </button>
          </div>
          <div className={styles.bio}>
            {isNftPage
              ? collectionData.nftDescription
              : projectData?.description}
          </div>
          {isNftPage ? (
            <div className={styles.makeOrderBtn}>
              <SquareBtn
                width="180"
                height="44"
                fontSize="17px"
                text={"+ Make order"}
                handler={makeOrderHandler}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.statistics}>
        <hr className={styles.line} />
        <div className={styles.infoItems}>
          <div className={styles.infoItem}>
            <div className={styles.key}>Market Cap</div>
            <div className={styles.statisticValue}>
              {`${statisticData?.marketCap}$` || "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Supply</div>
            <div className={styles.statisticValue}>
              {`${collectionData?.supply}` || "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Listed</div>
            <div className={styles.statisticValue}>
              {statisticData?.listed || "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Total Volume</div>
            <div className={styles.statisticValue}>
              {statisticData?.totalVolume
                ? `${statisticData?.totalVolume}$`
                : "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Mint price</div>
            <div className={styles.statisticValue}>
              {collectionData?.mintPrice ? `${collectionData?.mintPrice}$` : "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Royalty Fee</div>
            <div className={styles.statisticValue}>
              {collectionData?.creatorFee ? `${collectionData?.creatorFee}%` : "-"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.key}>Revenue</div>
            <div className={styles.statisticValue}>
              {collectionData?.revenue ? `${collectionData?.revenue}%` : "-"}
            </div>
          </div>
        </div>
        <div className={styles.infoItemsMobile}>
          <div className={styles.infoItemsColumn}>
            <div className={styles.infoItem}>
              <div className={styles.key}>Market Cap</div>
              <div className={styles.statisticValue}>
                {statisticData?.marketCap || "-"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.key}>Supply</div>
              <div className={styles.statisticValue}>
                {collectionData?.supply || "-"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.key}>Listed</div>
              <div className={styles.statisticValue}>
                {statisticData?.listed || "-"}
              </div>
            </div>
    
          </div>
          <div className={styles.infoItemsColumn}>
            <div className={styles.infoItem}>
              <div className={styles.key}>Total Volume</div>
              <div className={styles.statisticValue}>
                {statisticData?.totalVolume
                  ? `${statisticData?.totalVolume}$`
                  : "-"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.key}>Mint price</div>
              <div className={styles.statisticValue}>
                {collectionData?.mintPrice ? `${collectionData?.mintPrice}$` : "-"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.key}>Royalty Fee</div>
              <div className={styles.statisticValue}>
                {collectionData?.creatorFee ? `${collectionData.creatorFee}%` : "-"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.key}>Revenue</div>
              <div className={styles.statisticValue}>
                {collectionData?.revenue ? `${collectionData.revenue}%` : "-"}
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.line} />
      </div>
    </div>
  );
}
