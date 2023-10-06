import styles from '../styles/news-page.module.scss'
import Image from 'next/image'
import loader from '../../utils/loader';
import RecommendedNews from '../recommended/RecommendedNews';
import HTMLReactParser from 'html-react-parser'

const NewsPage = ({news}) => {
    return (
        <>
        <div className={styles.news}>
            <div className={styles.dateInfo}>
                <span>{news.date}</span>
                <span className={styles.dote}></span>
                <span>News theme</span>
            </div>
            <div className={styles.title}>
                <h1>
                 {news.title}
                </h1>
            </div>
            <div className={styles.img}>
                <Image
                loader={() => loader(news?.img)} 
                width={'580'} 
                height={'342'} 
                src={news.img} 
                alt={news.title}/>
            </div>
            <div className={styles.description}>
                {HTMLReactParser(news.description)}
            </div>
        </div>
        <RecommendedNews news={news.recommendations}/>
        </>

    );
}

export default NewsPage;
