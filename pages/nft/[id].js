import BuyNft from '../../app/components/buyNftPage/BuyNft'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import getNft from '../../app/services/getNft'
import icons from '../../app/assets/icons/socialmedia/socialmedia'

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

export default function BuyNftPage({nft}) {
  return (
    <>
    <HeadBlock title={'NFT Page'}/>
    <Layout>
        <BuyNft nft={nft}/>
    </Layout>
    </>
  )
}