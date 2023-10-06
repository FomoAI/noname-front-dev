import { useState } from 'react'
import styles from '../styles/banner.module.scss'
import Slide from '../components/BannerSlide/BannerSlide'
import SquareBtn from '../../components/UI/buttons/SquareLightBtn'
import { useRouter } from 'next/router'
import deleteSlide from '../services/bannerServices/deleteSlide'

const Banner = ({slides}) => {
    const [slideItems,setSlideItems] = useState(slides)
    const router = useRouter()
    const remove = async (id) => {
        try{
            const {success} = await deleteSlide(id)
            
            if(success){
                setSlideItems((state) => {
                    return (
                        state.filter((item) => item._id !== id)
                    )
                })
            }
            
        }catch(error){
            alert(error)
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.title}>
                    <h1>Banner</h1>
                </div>
                <div className={styles.add}>
                    <SquareBtn 
                    handler={() => router.push('/admin/banner/create')} 
                    text={'Create Slide'} 
                    type={'red'}/>
                </div>
            </div>
            <div className={styles.slides}>
                {slideItems.reverse().map((slide,index) => {
                    return <Slide 
                    remove={remove} 
                    index={index} 
                    key={slide._id} 
                    slide={slide}/>
                })}
            </div>
        </div>
    );
}

export default Banner;
