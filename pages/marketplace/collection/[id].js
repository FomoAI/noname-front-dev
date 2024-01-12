import getCollection from '../../../app/services/getCollection'
import Layout from '../../../app/components/layout/index'
import HeadBlock from '../../../app/components/head/Head'
import CollectionNftsPage from '../../../app/components/collectionPage/CollectionPage'

export async function getServerSideProps(context) {
    try{
        const {collection,ethExchange} = await getCollection(context.params.id)
        
      if(!collection){
        return { props: { collection :[]} }
      }
      return { props: { collection,ethExchange} }
      
    }catch(error){
      return { props: { collection:[] } }
    }
}

export default function CollectionPage({collection,ethExchange}) {

  return (
    <>
    <HeadBlock title={'NFT Marketplace - Collection'}/>
    <Layout>
      <CollectionNftsPage ethExchange={ethExchange} data={collection[0]} isNftPage={false}/>
    </Layout>
    </>
  )
}
