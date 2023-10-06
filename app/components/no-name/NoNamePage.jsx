import { useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Lottie from 'lottie-react'
import menuCloseLottie from '../../assets/lotties-animations/menu.json'
import { toggleModalWithoutBlock,openModal } from '../../store/slices/modalsSlice'
import Logo from '../../assets/img/logo-beta.svg'
import nonameGif from '../../assets/video/noname.gif'
import socialmediaicons from '../../assets/icons/no-name-socialmedia/socialmedia'
import CookieAlert from '../../assets/components/cookieAlert/CookieAlert'
import Burger from '../../assets/components/nonameBurger/Burger'
import CookieTools from '../../utils/cookieTools'
import styles from '../styles/no-name.module.scss'

const listNNInfo = [
  {
    name:'About us',
    href:'/info/#about-us'
  },
  {
    name:'Portfolio',
    href:'/info/#portfolio'
  },
  {
    name:'Partners',
    href:'/info/#partners'
  },
  {
    name:'Contact',
    href:'/info/#contact'
  },
]

const listInvest = [
  {
    name:'NFT Launch',
    href:'/startups'
  },
  {
    name:'Public Launch',
    href:'/donates'
  },
  {
    name:'Early rounds',
    href:'/crypto'
  },
  {
    name:'Business',
    href:'/business'
  },
]

export default function NoNamePage({socialMedia,whitepaper,shillClub}) {
  const [links,setLinks] = useState(() => [
    {
      name:'NFT Marketplace',
      href:'/marketplace'
    },
    {
      name:'Leaderboard',
      href:'/leaderboard'
    },
    {
      name:'Dashboard',
      href:'/dashboard'
    },
    {
      name:'Shill Club',
      href:shillClub,
      type:'a'
    },
    {
      name:'NN Academy',
      href:'/academy'
    },
    {
      name:'Calendar',
      href:'/calendar'
    },
    {
      name:'Blog',
      href:'/blog'
    },
    {
      name:'Whitepaper',
      href:whitepaper,
      type:'a',
    },
  ])
  const videoEl = useRef(null);
  const router = useRouter()
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.modals.nonameNavigation.state)

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  const navModalHandler = (event) => {
    const id = event.target.id

    if(id === 'toggle-modal'){
      return
    }

    if(id === 'open-modal'){
      dispatch(toggleModalWithoutBlock('nonameNavigation'))
      return
    }

    isVisible && dispatch(toggleModalWithoutBlock('nonameNavigation'))
  }

  useEffect(() => {
    const checkCookie = () => {
      if(CookieTools.get('nonameVisit') !== 'true'){
        dispatch(openModal('cookie'))
      }
    }
    checkCookie()
    attemptPlay();
  }, []);

  return (
    <>
    <div 
    onClick={navModalHandler} 
    className={styles.body}>
      <div className={styles.container}>
      <div className={styles.burgerWrapper}>
        <Burger
        id={'open-modal'}
        />
      </div>
        <div className={styles.info}>
          <Image
          className={styles.logo} 
          src={Logo} 
          alt='Noname'/>
          <h1 className={styles.title}>NONAME</h1>
          <p className={styles.text}>Noname is a multipurpose platform 
            designed to open the world of investments for you.</p>
          <div className={styles.socialmedia}>
            {
              socialMedia?.map((socialItem,index) => {
                return (
                  <a 
                  target='_blank'
                  href={socialItem.link}
                  key={socialItem.alt}
                  className={styles.socialmediaItem}>
                    <Image src={socialmediaicons[socialItem.alt]} alt={socialItem.alt}/>
                  </a>
                )
              })
            }

          </div>
          <button 
          onClick={() => router.push('/info')}
          className={styles.investmentsBtn}>
            GO to investmens
          </button>
        </div>
        <div className={styles.column}>
            <div className={styles.gifWrapper}>
              <figure>
                <Image 
                className={styles.nonameGif}
                src={nonameGif} alt='noname'/>
              </figure>
            </div>
        </div> 
        <div 
          id='toggle-modal'
          className={
          isVisible
          ?
          styles.menu + ' ' + styles.visible 
          :
          styles.menu
          }>  
          <button
            id='open-modal'
            className={styles.closeBtn}
          >
            <Lottie animationData={menuCloseLottie}/>
          </button>
          <div id='toggle-modal' className={styles.menuСhapter}>
            <Link href={'/info'} className={styles.chapterLink}>
              NN INFO
            </Link>
            <div id='toggle-modal' className={styles.list}>
              {
                listNNInfo.map((link,index) => {
                  return (
                    <Link 
                    key={index}
                    className={styles.link} 
                    href={link.href}>
                      {link.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div id='toggle-modal' className={styles.menuСhapter}>
            <div id='toggle-modal' className={styles.chapterTitle}>
            Invest
            </div>
            <div id='toggle-modal' className={styles.list}>
              {
                listInvest.map((link,index) => {
                  return (
                    <Link 
                    key={index}
                    className={styles.link} 
                    href={link.href}>
                      {link.name}
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div id='toggle-modal' className={styles.chapters}>
              {
                links.map((link,index) => {
                  if(link.type === 'a'){
                    return (
                      <a
                      key={index}
                      className={styles.chapterLink}
                      target='_blank'
                      href={link.href}
                      >
                        {link.name}
                      </a>
                    )
                  }
                  return (
                    <Link 
                    key={index}
                    href={link.href} 
                    className={styles.chapterLink}>
                      {link.name}
                    </Link>
                  )
                })
              }
          </div>
       </div>
      </div>
    </div>
    <CookieAlert type='main'/>
    </>
  )
}
