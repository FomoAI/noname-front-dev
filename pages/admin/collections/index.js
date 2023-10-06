import HeadBlock from '../../../app/components/head/Head'
import Layout from '../../../app/admin/components/layout/index'
import getNews from '../../../app/admin/services/newsServices/getNews'
import Collections from '../../../app/admin/pages/Collections'
import getCollections from '../../../app/services/getCollections'

export async function getServerSideProps(ctx) {
  try{
    const {success,collections} = await getCollections()

    if(success){
      return {
        props:{collections}
      }
    }

    return {
      props:{
        collections:[]
      }
    }
   
  }catch(error){
    return {
      props:{
        collections:[]
      }
    }
  }
}

export default function AdminCollections({collections}) {
  
  return (
    < >
      <HeadBlock title={'Admin - Collections'}/>
      <Layout>
        <Collections collectionsInitial={collections}/>
      </Layout>
    </>
  )
}
