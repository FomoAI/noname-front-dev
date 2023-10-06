import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'
import styles from './reviews.module.scss'
import 'swiper/css';
import 'swiper/css/pagination';

export default function Reviews({data,}) {

  return (
    <div className={styles.body}>
        <SubTitle>
            {data.title}
        </SubTitle>
        <div className={styles.items}>
            <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true ,currentClass:'reviews-pagination'}}
            className='review-swiper'
            spaceBetween={32}
            slidesPerView={3}
            breakpoints={{
                320:{
                    slidesPerView:1,
                },
                890:{
                    slidesPerView:2,
                },
                1330:{
                    slidesPerView:3
                },
            }}
            >
            {
                data.items.map((item,index) => {
                    return (
                        <SwiperSlide className='review-slide' key={index}>
                            <div className={styles.item} key={index} tabIndex={0}>
                                <div className={styles.head}>
                                    <img src={loader(item.img)} alt={item.name}/>
                                    <span>{item.date} </span>
                                </div>
                                <div className={styles.name}>
                                    {item.name}
                                </div>
                                <div className={styles.itemBody}>
                                    {item.body}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
        </div>
    </div>
  )
}
