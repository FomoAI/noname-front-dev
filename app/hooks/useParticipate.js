import { useState, useCallback, useLayoutEffect, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal,openModal } from "../store/slices/modalsSlice";
import { getPoolInfo } from "../smart/initialSmartMain";
import addDateAndTime from '../utils/addDateAndTime'
import parseDate from '../utils/parseDate'
import blockScroll from '../utils/blockScroll'

const participateCards = [
    {
      title: "Staking",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: false,
      btnName: "Stake",
      nft: false,
    },
    {
      title: "Purchase",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: false,
      btnName: "Approve",
      purchase: null,
    },
    {
      title: "Claim",
      start: "2022-06-09 16:00",
      end: "2022-06-09 16:00",
      state: false,
      btnName: "Claim",
      claim: null,
    },
];

const useParticipate = ({type = '' ,id='',project}) => {
    const [loading,setLoading] = useState(false)
    const [cards,setCards] = useState(participateCards)
    const [isActual,setIsActual] = useState(true)
    const [claimValue,setClaimValue] = useState(0)
    const modals = useSelector((state) => state.modals)
    const isAuth = useSelector((state) => state.auth.userData.isAuth);
    const dispatch = useDispatch()

    const modalsHandler = useCallback((action,modal) => {
      if(action === 'open'){
        dispatch(openModal(modal))
      }
      if(action === 'close'){
        dispatch(closeModal(modal))
      }
    },[modals]) 

    const resetCard = () => {
      setCards([
        {
          title: "Staking",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          btnName: "Stake",
          nft: false,
        },
        {
          title: "Purchase",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          btnName: "Participate",
          purchase: false,
        },
        {
          title: "Claim",
          start: "2022-06-09 16:00",
          end: "2022-06-09 16:00",
          state: false,
          btnName: "Claim",
          claim: false,
        },
    ])
    }

    const startStaking = () => {
      setCards(
        [
          {
            title: "Staking",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: true,
            btnName: "Stake",
            nft: true,
          },
          {
            title: "Purchase",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: false,
            btnName: "Approve",
            purchase: null,
          },
          {
            title: "Claim",
            start: "2022-06-09 16:00",
            end: "2022-06-09 16:00",
            state: false,
            btnName: "Claim",
            claim: null,
          },
        ]
      )
    }

    const startPurchase = () => {
      setCards(participateCards.map((card) => {
        if(card.title === 'Purchase'){
          return {...card,purchase:true,state:true}
        }
        if(card.title === 'Staking'){
          return {...card,nft:false,state:false}
        }
        return card
      }))
    }

    const endPurchase = () => {
      setIsActual(false)
    }

    const claim = () => {
      setCards(participateCards.map((card) => {
        if(card.title === 'Staking'){
          return {...card,nft:false,state:false}
        }
        if(card.title === 'Purchase'){
          return {...card,purchase:false,state:false}
        }
        if(card.title === 'Claim'){
          return {...card,state:true,claim:true}
        }
        return card
      }))
    }

    const selectNft = () => {
      
    }

    const openWallet = useCallback(() => {
      modalsHandler('open','wallet')
      modalsHandler('close','connect')
      blockScroll()
    },[modals])

    useLayoutEffect(() => {
      if(!isAuth){
        return
      }
      const checkClaim = () => {
        
        const isAlreadyClaimProjects = localStorage.getItem('isClaimed')

        const isAlreadyClaim = 
        isAlreadyClaimProjects 
        && 
        JSON.parse(isAlreadyClaimProjects).find((pr) => {
          return (
            pr.project === project._id
            &&
            String(pr.poolId) === String(project.poolId)
          )

        } )

        return isAlreadyClaim
      }

      const cardsStateHandler = async () => {
        setLoading(true)

        const isAlreadyClaim = checkClaim()
        
        if(isAlreadyClaim?.isAlreadyClaim){
          resetCard()
          setLoading(false)
          return
        }

        const {response} = await getPoolInfo(project.poolId)

        if(response.isClaim){
          claim()
          setClaimValue(response.claimed)
          setLoading(false)
          return
        }
        
        const stakeNftEndTime = addDateAndTime(parseDate(project.dates.to),project.timeEnd)
        const purchaseEndTime = addDateAndTime(parseDate(project.purchaseDates.to),project.purchaseTimeEnd)
        
        const isPurchaseEnd = purchaseEndTime < new Date().getTime()
        const isPurchaseStart = stakeNftEndTime < new Date().getTime()
        
        if(isPurchaseEnd){
          endPurchase()
          setLoading(false)
          return
        } 

        if(isPurchaseStart){
          startPurchase()
          setLoading(false)
          return
        }

        startStaking()
        setLoading(false)
      }

      cardsStateHandler()
    }, [id,isAuth]); 

    return {
      project,cards,modals,
      modalsHandler,isAuth,isActual,
      openWallet,
      loading,
      selectNft,
      claim,
      startStaking,
      startPurchase,
      claimValue,
      resetCard
    };
}

export default useParticipate;

