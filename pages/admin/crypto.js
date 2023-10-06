import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import ProjectsGallery from '../../app/admin/pages/ProjectsGallery'
import fetchProjects from '../../app/services/fetchProjects'

export async function getServerSideProps(ctx) {
  try{
    const {projects} = await fetchProjects('crypto')
    if(!projects){
      return { props: { projects :[]} }
    }
    return { props: { projects } }
    
  }catch(error){
    return { props: { projects:[] } }
  }
}
export default function Admin({projects}) {

  return (
    < >
      <HeadBlock title={'Admin - Crypto'}/>
      <Layout>
        <ProjectsGallery title={'Crypto'} projects={projects}/>
      </Layout>
    </>
  )
}
