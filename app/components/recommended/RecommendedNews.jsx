import styles from '../styles/recommended.module.scss'
import NewsItem from '../newsItem/NewsItem'
import HTMLReactParser from 'html-react-parser'

const RecommendedNews = ({news}) => {
    return (
        <>
        <div className={styles.title}>
        Recommended for you
        </div>
        <div className={styles.recommended}>
            {news.map((newsItem,index) => {
                return <NewsItem newsItem={newsItem} id={index} key={index}/>
            })}
        </div>
        </>
    );
}

export default RecommendedNews;
