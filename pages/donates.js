import Layout from '../app/components/layout/index'
import HeadBlock from '../app/components/head/Head'
import Main from '../app/components/main/Main'
import getCurrentProjects from '../app/services/getCurrentProjects'
import { useDispatch } from 'react-redux'
import {setProjects} from '../app/store/slices/allProjects'
import { useEffect } from 'react'
import getProjectsSmartData from '../app/services/getProjectsSmartData'
import Hidden from '../app/assets/components/HiddenComponent/Hidden'

export async function getServerSideProps() {
  const {projects} = await getCurrentProjects('donates')
  
  return { props: { projects } }
}


export default function donates({projects}) {

  const pageInfo = {
    title:'Early rounds',
    description:
    `
    <div class="center-text">
      <p>
      Investing at early rounds of investing rounds might well be quite beneficial as you may be looking at the next gem or a project which will change the industry while the cost of entrance in such a project remains low.  Find here only the best projects powered by zkSync solution with great potential and invest in them.
      </p>
    </div>

    `
  }

  return (
    <>
    <HeadBlock title={'Early rounds'}/>
    <Layout>
      <Main 
      projects={projects}
      info={pageInfo}
      type={'Early rounds'} 
      />
      {/* <Hidden>
      A bit of patience... coming soon
      </Hidden> */}
    </Layout>
    </>
  )
}
