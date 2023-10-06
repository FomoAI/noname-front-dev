import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNews } from '../../app/store/slices/newsSlice'
import HeadBlock from '../../app/components/head/Head'
import News from '../../app/components/news/News'
import Layout from '../../app/components/layout/index'
import getNews from '../../app/admin/services/newsServices/getNews'


export async function getServerSideProps() {
  const {success,news} = await getNews()
  if(!success){
    return { props: { news:[] } }
  }
  return { props: { news } }
}


export default function news({news}) {
  const dispatch = useDispatch()

  useEffect(() => {
    if(news?.length){
      dispatch(setNews(news.reverse()))
    }
  },[])


  return (
    <>
      <HeadBlock title={'Blog'}/>
      <Layout>
        <News/>
      </Layout> 
    </>
  )
}
