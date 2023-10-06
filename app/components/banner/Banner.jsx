import Info from '../../assets/components/info/Info'
import styles from '../styles/banner.module.scss'
import Swiper from '../../assets/components/swiper/Swiper'
import { useEffect } from 'react'
import { useState } from 'react'
import getSlides from '../../admin/services/bannerServices/getSlides'

export default function Banner() {
    const [slides,setSlides] = useState([])

    useEffect(() => {
        getSlides().then(({slides}) => setSlides(slides))
    },[])

  return (
    <div className={styles.banner}>
        <Info title={'Featured projects'} 
        text={'Upcoming top tier projects for investing.'}/>
        <div className={styles.swipper}>
         <Swiper slides={slides}/>
        </div>
    </div>
  )
}
