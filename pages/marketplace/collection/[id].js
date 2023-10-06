import getCollection from '../../../app/services/getCollection'
import Layout from '../../../app/components/layout/index'
import HeadBlock from '../../../app/components/head/Head'
import CollectionNftsPage from '../../../app/components/collectionPage/CollectionPage'

export async function getServerSideProps(context) {
    try{
        const {collection} = await getCollection(context.params.id)
        
      if(!collection){
        return { props: { collection :[]} }
      }
      return { props: { collection} }
      
    }catch(error){
      return { props: { collection:[] } }
    }
}

export default function CollectionPage({collection}) {

  return (
    <>
    <HeadBlock title={'NFT Marketplace - Collection'}/>
    <Layout>
      <CollectionNftsPage data={collection[0]} isNftPage={false}/>
    </Layout>
    </>
  )
}
