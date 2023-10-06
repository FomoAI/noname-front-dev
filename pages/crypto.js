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
    const {projects} = await getCurrentProjects('crypto')
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
  title:'Crypto',
  description:
  `
  <div className='center-text'>
    <p>
    Various crypto projects powered by zkSync for you to choose to invest in. We provide opportunities to invest in projects we have checked, reviewed and approved to ensure safety of your investments and guarantee that you will not lose what you have invested. Only the best zkSync projects. 
    </p>
  </div>
  `
}

  return (
    < >
      <HeadBlock title={'Crypto'}/>
      <Layout>
        <Main 
        projects={projects}
        info={pageInfo}   
        type={'Crypto'} 
        />
        {/* <Hidden>
        A bit of patience... coming soon
        </Hidden> */}
      </Layout>
    </>
  )
}

