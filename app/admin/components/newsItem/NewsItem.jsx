import React from 'react'
import styles from '../../styles/news-item.module.scss'
import Image from 'next/image'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import loader from '../../../utils/loader'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import { useRouter } from 'next/router'

export default function NewsItem({index,remove,newsItem}) {
  const router = useRouter()

  return (
    <div tabIndex={index} className={styles.body}>
      <div className={styles.img}>
        <Image 
        width={'380'}
        height={'240'}
        loader={() => loader(newsItem.img)}
        src={newsItem.img} 
        alt={'news-img'}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.text}>
          {newsItem.date}
        </div>
        <div className={styles.title}>
            <h3>{newsItem.title}</h3>
        </div>
      </div>
      <div className={styles.edit}>
          <SquareBtn 
          handler={() => router.push(`/admin/news/create/${newsItem._id}`)} 
          width='50' 
          text={<AiOutlineEdit/>}/>
          <SquareBtn handler={(event) => remove(event,newsItem._id,'toggle-modal')} width='50' text={<AiOutlineDelete/>}/>
      </div>
    </div>
  )
}
