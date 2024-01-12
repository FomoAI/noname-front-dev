import getCollections from '../../app/services/getCollections'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import Marketplace from '../../app/components/marketplace/Marketplace'
import Hidden from '../../app/assets/components/HiddenComponent/Hidden'

export async function getServerSideProps() {
  const {collections} = await getCollections()
  
  return { props: { collections } }
}

export default function MarketplacePage({collections}) {
  return (
    <>
    <HeadBlock title={'NFT Marketplace'}/>
    <Layout>
      {
        collections?.length
        ?
        <Marketplace collectionsData={collections}/>
        :
        <Hidden>
          A bit of patience... coming soon
        </Hidden>
      }
    </Layout>
    </>
  )
}
