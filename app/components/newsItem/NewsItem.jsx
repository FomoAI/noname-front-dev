import styles from '../styles/news-item.module.scss'
import Image from 'next/image'
import loader from '../../utils/loader'
import HTMLReactParser from 'html-react-parser'
import { useRouter } from 'next/router'

const NewsItem = ({newsItem}) => {
    if(!newsItem){
        return <></>
    }
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/blog/${newsItem._id}`)} className={styles.newItem}>
            <div className={styles.img}>
                <Image 
                loader={() => loader(newsItem.img)}
                width={'386'} 
                height={'228'} 
                src={newsItem.img} 
                alt={newsItem.title}/>
            </div>
            <div className={styles.info}>
                <div className={styles.dateInfo}>
                    <span>{newsItem.date}</span>
                    <span className={styles.dote}></span>
                    <span>News theme</span>
                </div>
                <div className={styles.title}>
                    {newsItem.title}
                </div>
                <div className={styles.description}>
                    {HTMLReactParser(newsItem.description)}...
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
