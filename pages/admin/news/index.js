import HeadBlock from '../../../app/components/head/Head'
import Layout from '../../../app/admin/components/layout/index'
import News from '../../../app/admin/pages/News'
import getNews from '../../../app/admin/services/newsServices/getNews'

export async function getServerSideProps(ctx) {
  try{
    const {success,news} = await getNews()

    if(success){
      return {
        props:{news}
      }
    }

    return {
      props:{
        news:[]
      }
    }
   
  }catch(error){
    return {
      props:{
        news:[]
      }
    }
  }
}
export default function AdminNews({news}) {

  return (
    < >
      <HeadBlock title={'Admin - News'}/>
      <Layout>
        <News news={news}/>
      </Layout>
    </>
  )
}
