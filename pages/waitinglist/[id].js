
import HeadBlock from '../../app/components/head/Head'
import WaitingPage from '../../app/components/waitingPage/WaitingPage'
import Layout from '../../app/components/layout/index'
import fetchFavourites from '../../app/services/fetchFavourites'

export async function getServerSideProps(context) {
  const {success,favourites} = await fetchFavourites(context.params.id)
  
  return { props: { favourites } }
}

export default function WaitingList({favourites}) {

  return (
    < >
      <HeadBlock title={'Waiting list'}/>
      <Layout>
        <WaitingPage favouritesData={favourites}/>
      </Layout>
    </>
  )
}
