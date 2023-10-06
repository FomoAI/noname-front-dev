import { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/project-news.module.scss'
import loader from '../../../utils/loader'
import Image from 'next/image'
import successSvg from '../../../assets/icons/complete.svg'

export default function ProjectNews({news,projectNews,handler}) {
    if(!news?.news){
        return <></>
    }
    const [newsItems,setNewsItems] = useState(() => news.news.map((news) => {
        if(projectNews.find((prNews) => prNews._id === news._id)){
            return {...news,isSelected:true}
        }
        return news
    }))

    const addNewsToRecs = useCallback((selectedNews) => {
        const changedNews = newsItems.map((news) => {
            if(news._id === selectedNews._id){
                return {...news,isSelected:!news.isSelected}
            }
            return news
        })
        setNewsItems(changedNews)
        
    },[news,newsItems])

    useEffect(() => {
        handler('news',newsItems.filter((item) => item.isSelected))
    },[newsItems])

  return (
    <div className={styles.body}>
        <div className={styles.title}>
            <h2>Recommendations</h2>
        </div>
        <div className={styles.news}>
            {newsItems.map((item) => {
                return (
                    <div 
                    onClick={() => addNewsToRecs(item)} 
                    key={item._id} 
                    className={styles.newsItem}>
                        <Image
                        alt={item.title}
                        width={'386'}
                        height={'228'}
                        src={item.img}
                        loader={() => loader(item.img)}
                        />
                        <div className={styles.newsTitle}>
                            {item.title}
                        </div>
                        {
                            
                            item.isSelected
                            ?
                            <div className={styles.selected}>
                                <Image src={successSvg} alt={item.title}/>
                            </div>
                            :
                            <></>
                        }
                    </div>
                )
            })}
        </div>
    </div>
  )
}
