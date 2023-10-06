import { useCallback ,useState} from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/news.module.scss'
import NewsItem from '../components/newsItem/NewsItem';
import SquareBtn from '../../components/UI/buttons/SquareLightBtn'
import deleteNews from '../services/newsServices/deleteNews';
import useModal from '../../hooks/useModal';
import Modal from '../../assets/components/modal/Modal';
import Loader from '../../assets/components/loader/Loader'

export default function News({news}) {
  const [loading,setLoading] = useState(false)
  const [selectedNews,setSelectedNews] = useState('')
  const [newsData,setNewsData] = useState(() => news.reverse())
  const {modalHandler,state} = useModal()
  const router = useRouter() 

  const removeNews = useCallback(async (event,id) => {
    if(event.target.id === 'delete'){
      setLoading(true)
      const {success} = await deleteNews(selectedNews)
      setLoading(false)
      if(success){
        modalHandler(null,state)
        setNewsData((state) => {
          return(
            state.filter((item) => {
              return item._id !== selectedNews
            })
          )
        })
      }
      return
    }
    modalHandler(null,true)
    setSelectedNews(id)
  },[selectedNews,state])
    
  if(loading){
    <Loader/>
  }

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h1>News</h1>
        </div>
        <div className={styles.add}>
            <SquareBtn handler={() => router.push('/admin/news/create')} type='red' text={'Create News'}/>
        </div>
      </div>
      <div className={styles.news}>
        {
        newsData?.length
        ?
        newsData.map((item,index) => {
            return (
                <NewsItem index={index} remove={removeNews} newsItem={item} key={item._id}/>
            )
        })
        :
        <></>
        }
      </div>
      <Modal handler={modalHandler} isVisible={state}>
          <div className={styles.confirmDelete}>
           Are you sure you want to delete this project?
          </div>
          <SquareBtn handler={removeNews} btnId='delete' text={'Confirm'} width={'330'}/>
      </Modal>
    </div>
  )
}
