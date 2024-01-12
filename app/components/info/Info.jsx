import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import useModal from '../../hooks/useModal'
import logo from '../../assets/img/logo.svg'    
import ventures from '../../assets/img/ventures.svg'
import Image from 'next/image'
import MainBtn from '../UI/buttons/MainBtn'
import Form from '../../assets/components/form/Form'
import SubTitle from '../../assets/components/subTitle/SubTitle'
import Gallery from '../../assets/components/gallery/Gallery'
import Accordion from '../accordion/Accordion'
import Roadmap from '../../assets/components/roadmap/Roadmap'
import Community from '../community/Community'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import styles from '../styles/info.module.scss'

const links = [
    {
        name:'About us',
        href:'#about-us'
    },
    {
        name:'Portfolio',
        href:'#portfolio'
    },
    {
        name:'Partners',
        href:'#partners'
    },
    {
        name:'Contact',
        href:'#contact'
    },
]

export default function Info({data}) {
    const {modalHandler,state} = useModal()
    const [isError,setIsError] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        const params = router.query
        
        if(params?.success){
            setIsSuccess(true)
            
            return
        }

        if(params?.error){
            setIsError(true)

            return
        }

        if(params?.login){
            dispatch(toggleModal('wallet'))
        }
    },[])
    
  return (
    <>
        <div className={styles.body}>
        <div className={styles.joinUs}>
            <div className={styles.logo}>
                <Image src={logo} width={166} alt='logo'/>
            </div>
            <nav className={styles.nav}>
                {links.map((link,index) => {
                    return (
                        <a key={index} href={link.href}>
                            {link.name}
                        </a>
                    )
                })}
            </nav>
            <div className={styles.ventures}>
                <Image src={ventures} alt='ventures'/>
            </div>
            <div className={styles.text}>
            Noname is a universal platform which enables our users to invest into different types of assets including crypto projects, NFT projects, RWA and more. We are building our investing environment using zkSync technology to ensure safety and comfort of users. We believe that zkSync is the most efficient solution for Layer 2 that is why we are aiming at expanding the zkSync ecosystem. For that we have our special tools: NFT Launchpad, NFT Marketplace which supports zkSync-based projects.
            </div>
            <MainBtn text={'Join us'} handler={modalHandler}/>
            <Form handler={modalHandler} isVisible={state}/>
        </div>
        <div id='about-us' className={styles.about}>
            <div className={styles.aboutInfo}>
                <SubTitle>
                About us
                </SubTitle>
                <div className={styles.aboutText}>
                <div>
                Noname is an investment platform designed to open the world of investments for you. 
                We are building a whole new ecosystem using zkSync L2 which ensures safety and 
                rapidity of transactions. Growing up fast, zkSync L2 is one of the best solutions
                 for Ethereum network with low gas prices and safety that is guaranteed by zero- knowledge
                  protocol.
                    <br/>
                    <p>
                    It is said that the main rule of every investor is to diversify their assets,
                
                     which means to put your eggs in different baskets.
                    </p>
                </div>
                <b>
                    That is why Noname offers you various assets to invest in, such as:
                </b>
                <ul>
                    <li>RWA</li>
                    <li>Business</li>
                    <li>NFT Launch</li>
                    <li>Crypto.</li>
                </ul>
                <p>
                    For that, we have built a website with a simple and convenient 
                    interface. Every project available for investing will have detailed
                     descriptions about terms, perspectives etc. 
                </p>
                <b>
                    On the other hand, Noname offers a chance for would-be businessmen 
                    to receive the help and support that is needed. It includes:
                </b>
                <ul>
                    <li>Funding</li>
                    <li>Consulting (legal and accounting)</li>
                    <li>Partnership with other entrepreneurs</li>
                    <li>Advertising, etc.</li>
                </ul>
                <p>
                    With Noname, the world of investments will become simple and available for everyone. 
                </p>
                </div>
            </div>
            <div className={styles.features}>
                <SubTitle>
                Why Noname?
                </SubTitle>
                <div className={styles.featuresText}>
                    <p style={{'textAlign':'center'}}>
                    Learn from others, share your work, and extend your tool set with a diverse group
                    </p>
                    <div className={styles.featuresColums}>
                        <div className={styles.featuresColum}>
                            <b>Not only money</b>
                            <p style={{'textAlign':'center'}}>
                            Alongside with funding Noname offers a capable
                             team of professionals, including lawyers, accountants,
                             business consultants, advertising specialists who are 
                             willing to help you anyway they can
                            </p>
                        </div>
                        <div className={styles.featuresColum}>
                            <b>24/7</b>
                            <p style={{'textAlign':'center'}}>
                            Our support is not limited by time. Once you have started - we are always
                             here with you and for you. Step by step we help to move on, we help to overcome,
                              we help to be successful. Our strategy is simple: Your success is our success
                            </p>
                        </div>
                        <div className={styles.featuresColum}>
                            <b>Easy and fast </b>
                            <p style={{'textAlign':'center'}}>
                            Start your own business within minutes with 
                            Noname and support that we provide
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='portfolio'>
            <Gallery
            text={'Gems which we have invested in'}
            title={'Portfolio'} 
            items={data.portfolio}
            />
        </div>
        <div id='partners' className={styles.partners}>
            <Gallery 
            text={'Projects and companies which we trust to work with'} 
            title={'Partners'} 
            items={data.partners}
            />
        </div>
        <div className={styles.faq}>
            <Accordion items={data.faq} title={'FAQ'} />
        </div>
        <div className={styles.risks}>
            <Accordion items={data.risks} title={'Risks'} />
        </div>
        <div className={styles.roadmap}>
            <Roadmap items={data.roadmap}/>
        </div>
        <div id='contact'>
            <Community/>
        </div>
    </div>
    <CustomAlert
    title={'Ref link activate error'}
    text={'You can`t activate this referral link'}
    handler={() => setIsError(false)}
    isVisible={isError}
    isAutoClose={false}
    />
    <CustomAlert
    title={'Ref link activated'}
    text={'In order to finish activated referral link buy Noname NFT'}
    handler={() => setIsSuccess(false)}
    isVisible={isSuccess}
    isAutoClose={false}
    type='success'
    />
    </>
  )
}


