import getNft from '../../../app/services/getNft'
import Layout from '../../../app/components/layout/index'
import HeadBlock from '../../../app/components/head/Head'
import CollectionNftsPage from '../../../app/components/collectionPage/CollectionPage'

export async function getServerSideProps(context) {
    try{
        const {nft} = await getNft(context.params.id)
        
      if(!nft){
        return { props: { nft :{}} }
      }
      return { props: { nft} }
      
    }catch(error){
      return { props: { nft:{} } }
    }
}

export default function NftPage({nft}) {

  return (
    <>
    <HeadBlock title={'NFT Marketplace - Nft'}/>
    <Layout>
      <CollectionNftsPage isNftPage={true} data={nft}/>
    </Layout>
    </>
  )
}
