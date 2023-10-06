import { useDispatch } from 'react-redux'
import { closeModal } from '../../../store/slices/modalsSlice'
import { Transition } from 'react-transition-group'
import { useRef , useEffect} from 'react'
import closeSvg from '../../icons/close.svg'
import Image from 'next/image'
import cryptoSvg from '../../icons/crypto.svg'
import donateSvg from '../../icons/donate.svg'
import realEstateSvg from '../../icons/real-estate.svg'
import rocketSvg from '../../icons/rocket.svg'
import Link from 'next/link'
import styles from './nav-modal.module.scss'

const links = [
    {
        img:rocketSvg,
        href:'/startups',
        title:'NFT Launch',
        description:'A brand new launchpad  enabling NFT cryptoprojects to launch their INO and IDO',
    },
    {
        img:donateSvg,
        href:'/donates',
        title:'Early rounds',
        description:'Promising projects to invest in on early stages',
    },
    {
        img:cryptoSvg,
        href:'/crypto',
        title:'Public Launch',
        description:'The best crypto startups powered by zkSync and other beneficial offers from the cryptomarket',
    },
    {
        img:realEstateSvg,
        href:'/business',
        title:'Business',
        description:'Invest in various assets including startups, real estate etc. We provide the best options for mid-term and long-term investnents.',
    },
]

export default function NavModal({isVisible}) {
    const dispatch = useDispatch()
    const nodeRef = useRef(null)
    const transitionStyles = {
        entering: { opacity: 1 ,visibility:'visible'},
        entered:  { opacity: 1 ,visibility:'visible'},
        exiting:  { opacity: 0 ,visibility:'hidden'},
        exited:  { opacity: 0 ,visibility:'hidden'},
    };

    const close = () => {
        dispatch(closeModal('nav'))
    }

  return (
    <Transition in={isVisible} timeout={1000} nodeRef={nodeRef}>
        {
            (state) => (
                    <div ref={nodeRef} style={{...transitionStyles[state]}} className={styles.body}>
                        {
                            links.map((link) => {
                                return (
                                    <Link id='remove-block' key={link.title} onClick={close} className={styles.link} href={link.href}>
                                        <div id='remove-block' className={styles.img}>
                                            <Image src={link.img} alt='link-img'/>
                                        </div>
                                        <div id='remove-block' className={styles.info}>
                                            <div id='remove-block' className={styles.title}>
                                                {link.title}
                                            </div>
                                                <div id='remove-block' className={styles.description}>
                                                {link.description}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        
                        <div className={styles.line}></div>
                    </div>
            )
        }
    </Transition>
   
  )
}
