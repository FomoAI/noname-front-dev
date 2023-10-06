import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Main from '../app/components/main/Main'
import getCurrentProjects from '../app/services/getCurrentProjects'

export async function getServerSideProps() {
  try{
    const {projects} = await getCurrentProjects('startups')
    if(!projects){
      return { props: { projects :[]} }   
    }
    return { props: { projects } }
    
  }catch(error){
    return { props: { projects:[] } }
  }
}

export default function Home({projects}) {

const pageInfo = {
  title:'NFT Launch',
  description:
  `
  <div class="center-text">
    <p>
      The best place for NFT projects to start. Build your projects 
      with us in zkSynk L2 ecosystem. Fast and safe transactions, 
      fair terms and conditions for IDO and INO. Attract new audiences,
      get funding, do the marketing and launch right to the moon. 
    </p>
  </div>
  `
}

  return (
    < >
      <HeadBlock title={'Home'}/>
      <Layout>    
        <Main 
        projects={projects}
        info={pageInfo}
        type={'NFT Launch'} 
        />
      </Layout>
    </>
  )
}

