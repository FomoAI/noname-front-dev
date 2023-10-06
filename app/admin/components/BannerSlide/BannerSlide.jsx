import { useRouter } from 'next/router'
import styles from '../../styles/banner-slide.module.scss'
import BannerSlide from '../../../assets/components/bannerSlide/BannerSlide'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

const Slide = ({remove,slide,index}) => {
    const router = useRouter()
    const edit = () => {
        router.push(`/admin/banner/create/${slide._id}`)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.index}>
                Slide {index + 1}
            </div>
            <div className={styles.body}>
                <BannerSlide slide={slide}/>
                <div className={styles.edit}>
                    <SquareBtn handler={edit} width={'120'} text={<AiOutlineEdit/>}/>
                    <SquareBtn handler={() => remove(slide._id)} width={'120'} text={<AiOutlineDelete/>}/>
                </div>
            </div>
        </div>
    );
}

export default Slide;
