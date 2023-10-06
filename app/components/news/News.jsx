import styles from '../styles/news.module.scss'
import { useSelector } from 'react-redux'
import NewsItem from '../newsItem/NewsItem'

export default function News() {
  const news = useSelector((state) => state.news.news)
  
  return (
    <div className={styles.news}>
      {news.map((newsItem,index) => {
        return <NewsItem newsItem={newsItem} key={index}/>
      })}
    </div>
  )
}
