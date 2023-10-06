import { useRouter } from 'next/router'
import NewsPage from '../../app/components/newsPage/NewsPage'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import getNews from '../../app/admin/services/newsServices/getNews'

export async function getServerSideProps(context) {
  const {success,news} = await getNews(context.params.id)
  if(!success){
    return { props: { news:[] } }
  }
  return { props: { news } }
}


const News = ({news}) => {
    const router = useRouter()
    
    return (
      <>
      <HeadBlock title={'Blog'}/>
      <Layout>
        <NewsPage news={news}/>
      </Layout>
      </>
    );
}

export default News;
