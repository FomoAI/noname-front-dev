import { useState,useEffect } from 'react'
import Image from 'next/image'
import Lottie from 'lottie-react'

import Directions from '../../assets/components/directions/Directions'
import AboutUs from '../../assets/components/aboutUs/AboutUs'
import InfoBlock from '../../assets/components/infoBlock/InfoBlock'
import CoursesInfo from '../../assets/components/coursesInfo/CoursesInfo'
import StudyFormat from '../../assets/components/studyFormat/StudyFormat'
import Features from '../../assets/components/features/Features'
import Courses from '../../assets/components/courses/Courses'
import Authors from '../../assets/components/authors/Authors'
import Accordion from '../accordion/Accordion'
import Reviews from '../../assets/components/reviews/Reviews'
import AcademyCommunity from '../academyCommunity/AcademyCommunity'
import Loader from '../../assets/components/loader/Loader'
import getAcademyData from '../../services/getAcademyData'

import logo from '../../assets/img/logo.svg'
import academySvg from '../../assets/icons/academy-logo.svg'
import soldOutLottie from '../../assets/lotties-animations/NN SOLD OUT.json'
import styles from '../styles/academy.module.scss'

const links = [
    {
        name:'Directions',
        href:'#directions'
    },
    {
        name:'About us',
        href:'#about-us'
    },
    {
        name:'Study',
        href:'#study'
    },
    {
        name:'Price',
        href:'#price'
    },
    {
        name:'Team',
        href:'#team'
    },
    {
        name:'Contact',
        href:'#contact'
    },
]

const linksUA = [
    {
        name:'Напрямки',
        href:'#directions'
    },
    {
        name:'Про нас',
        href:'#about-us'
    },
    {
        name:'Навчання',
        href:'#study'
    },
    {
        name:'Ціна',
        href:'#price'
    },
    {
        name:'Команда',
        href:'#team'
    },
    {
        name:'Контакти',
        href:'#contact'
    },
]

export default function AcademyPage() {
    const [langs,setLangs] = useState([{isSelected:false,name:'UA'},{isSelected:true,name:'ENG'}])
    const [lang,setLang] = useState('ENG')
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState()
    const langsHandler = (selectedLang) => {
        setLangs((prev) => {
            return (
                prev.map((lang) => {
                    if(lang.name === selectedLang.name){
                        return {...lang,isSelected:true}
                    }
                    
                    return {...lang,isSelected:false}
                })
            )
        })
    }

    useEffect(() => {
        setLoading(true)

        const currentLang = langs.find((item) => item.isSelected).name

        getAcademyData(currentLang).then(({success,academyPageData}) => {
            setData(academyPageData)
            setLang(currentLang)
            setLoading(false)
        })

    },[langs])

    if(loading || !data){
        return <Loader/>
    }

  return (
    <>
    <main className={styles.body}>
        <div className={styles.langs}>
                <button 
                onClick={() => langsHandler({isSelected:false,name:'UA'})}
                className={
                    langs[0].isSelected
                    ?
                    styles.lang + ' ' + styles.selected
                    :
                    styles.lang
                }>
                    UA
                </button>
                <span>/</span>
                <button 
                onClick={() => langsHandler({isSelected:false,name:'ENG'})}
                className={
                    langs[1].isSelected
                    ?
                    styles.lang + ' ' + styles.selected
                    :
                    styles.lang
                }> 
                    ENG
                </button>
        </div>
        <div className={styles.joinUs}>
            <div className={styles.logo}>
                <Image src={logo} width={166} alt='logo'/>
            </div>
            <nav className={styles.nav}>
                {
                lang === 'ENG'
                ?
                links.map((link,index) => {
                    return (
                        <a key={index} href={link.href}>
                            {link.name}
                        </a>
                    )
                })
                :
                linksUA.map((link,index) => {
                    return (
                        <a key={index} href={link.href}>
                            {link.name}
                        </a>
                    )
                })
                }
            </nav>
        </div>
        <div className={styles.intro}>
            <Image src={academySvg} alt='noname academy'/>
            <div>
                {
                    data.academy.intro
                }

            </div>
        </div>
        <div id='directions' className={styles.directions}>
            <Directions data={data.directions}/>
        </div>
        <div className={styles.soldOutWrapper}>
            <span>{data.academy.soldOut}</span>
            <div className={styles.soldOut}>
                <Lottie animationData={soldOutLottie}/>
            </div>
        </div>
        <div id='about-us' className={styles.aboutUs}>
            <AboutUs data={data.academy.aboutUs}/>
        </div>
        <div className={styles.infoBlock}>
            <InfoBlock data={data.academy.infoBlock}/>
        </div>
        <div className={styles.coursesInfo}>
            <CoursesInfo data={data.coursesInfo} programms={data.directions.items}/>
        </div>
        <div id='study' className={styles.studyFormat}>
            <StudyFormat data={data.studyFormats}/>
        </div>
        <div className={styles.featrues}>
            <Features data={data.academy.features}/>
        </div>
        <div id='price' className={styles.courses}>
            <Courses data={data.courses} programms={data.directions.items}/>
        </div>
        <div id='team' className={styles.authors}>
            <Authors data={data.authors}/>
        </div>
        <div className={styles.faq}>
            <Accordion items={data.academy.faq} title={'FAQ'}/>
        </div>
        <div className={styles.reviews}>
            <Reviews data={data.reviews}/>
        </div>
    </main>
    <div id='contact' className={styles.community}>
        <AcademyCommunity lang={lang} link={data.academy.discordLink}/>
    </div>
    </>

  )
}
