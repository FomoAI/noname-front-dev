import styles from './banner-slide.module.scss'
import PinkBtn from '../../../components/UI/buttons/PinkBtn'
import Image from 'next/image'
import { useState } from 'react'
import useTimer from '../../../hooks/useTimer'
import { useEffect } from 'react'
import loader from '../../../utils/loader'

export default function BannerSlide({slide}) {
    const [timer,setTimer] = useState({
        d:'',
        h:'',
        m:'',
        s:''
    })
    const {days,hours,minutes,seconds} = useTimer(slide.date,slide.timeStart)
    
    useEffect(() => {
        setTimer({ 
            d:days,
            h:hours,
            m:minutes,
            s:seconds
        })
    },[days,hours,minutes,seconds])

  return (
    <div className={styles.slide}>
        <div className={styles.img}>
            <Image 
            width={'600'}
            height={'330'}
            loader={() => loader(slide.img)}
            src={slide.img} 
            alt='slide'/>
        </div>
        <div className={styles.info}>
            <div className={styles.title}>
                {slide.title}
            </div>
            <div className={styles.description}>
                {slide.description}
            </div>
            <div className={styles.timeInfo}>
                <span className={styles.key}>Contribution Closes:</span>
                <span className={styles.textBlue}>{`${timer.d}d ${timer.h}h ${timer.m}m ${timer.s}s`}</span>
            </div>
            <div className={styles.btn}>
                <PinkBtn 
                href={slide.link} 
                text={'See details'}/>
            </div>
        </div>
    </div>
  )
}
