import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import { useRouter } from "next/router"
import Header from "./Header"
import Footer from "./Footer"
import CookieAlert from "../../assets/components/cookieAlert/CookieAlert"
import { closeModal ,closeModalWithoutBlock,openModal} from "../../store/slices/modalsSlice"
import { setDiscord , setOpenSea} from "../../store/slices/communitySlice"
import getHeader from '../../admin/services/headerServices/getHeader'
import getFooter from '../../admin/services/footerServices/getFooter'
import styles from './styles/index.module.scss'
import blockScroll from "../../utils/blockScroll"
import CookieTools from "../../utils/cookieTools"

export default function index({children}) {
  const [data,setData] = useState({
    header:{
      name:'',
      link:'',
    },
    footer:{
      links:[],
      socialmedia:[]
    }
  })
  const dispatch = useDispatch()
  const modals = useSelector((state) => state.modals)

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('headerAndFooter'))){
      setData(JSON.parse(localStorage.getItem('headerAndFooter')))
    }
    const getData = async () => {
      try{
        const {header} = await getHeader()
        const {footer} = await getFooter()
        const layoutData = JSON.stringify({header:header[0],footer:footer[0]})
        if(layoutData !== localStorage.getItem('headerAndFooter')){
          localStorage.setItem('headerAndFooter',JSON.stringify({header:header[0],footer:footer[0]}))
          setData({header:header[0],footer:footer[0]})
        }
        dispatch(setDiscord(footer[0].discordLink))
        dispatch(setOpenSea(header[0].link))
      }catch(error){
        console.log(error)
      }
    }
    const checkCookie = () => {
      if(CookieTools.get('nonameVisit') !== 'true'){
        dispatch(openModal('cookie'))
      }
    }
    checkCookie()
    getData()
  },[])

  const modalsHandler = (event) => {
    const id = event?.target?.id
   
    if(modals.search.state && id !== 'toggle-modal'){
      dispatch(closeModal('search'))
    }
    if(modals.wallet.state){
      dispatch(closeModal('wallet'))
    }
    if(modals.nav.state){
      dispatch(closeModal('nav'))
    }
    if(modals.share.state){
      dispatch(closeModalWithoutBlock('share'))
    }
    if(modals.nftFilter.state && id !== 'toggle-modal'){
      dispatch(closeModalWithoutBlock('nftFilter'))
    }
    if(modals.collectionsFilter.state && id !== 'toggle-modal'){
      dispatch(closeModalWithoutBlock('collectionsFilter'))
    }
    if(modals.waitingListFilter.state && id !== 'toggle-modal'){
      dispatch(closeModalWithoutBlock('waitingListFilter'))
    }
  }
  
  return (
    <div className={styles.body} onClick={modalsHandler}>
      <CookieAlert/>
      <Header headerData={data.header}/>
      {children}
      <Footer footerData={data.footer}/>
    </div>
  )
}
