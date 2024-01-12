import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Main from '../app/components/main/Main'
import getCurrentProjects from '../app/services/getCurrentProjects'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'
import getProjectsSmartData from '../app/services/getProjectsSmartData'
import Hidden from '../app/assets/components/HiddenComponent/Hidden'

export async function getServerSideProps() {
  try{
    const {projects} = await getCurrentProjects('business')
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
  title:'Business',
  description:
  `
  <div class="center-text">
    <p> 
    Noname is not limited by the web3 startups. We provide opportunities in different spheres such as RWA, classic startups etc. Find what’s best for you with Noname. 
    </p>
  </div>
  `
}

  return (
    < >
      <HeadBlock title={'Business'}/>
      <Layout>
        <Main 
        projects={projects}
        info={pageInfo}
        type={'Business'} 
        />
        {/* <Hidden>
          A bit of patience... coming soon
        </Hidden> */}
      </Layout>
    </>
  )
}

