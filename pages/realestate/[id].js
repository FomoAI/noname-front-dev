import { useRouter } from 'next/router'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import ProjectPage from '../../app/components/projectPage/ProjectPage'
import fetchProject from '../../app/services/fetchProject.js'

export async function getServerSideProps(context) {
  const {project} = await fetchProject(context.params.id,'realestate')

  return {
    props: {project}, 
  }
}

const Project = ({project}) => {
    const router = useRouter()
    const { id } = router.query
    return (
      <>
        <HeadBlock title={'Project Page'}/>
      <Layout>
        <ProjectPage project={project} idDonate={false} id={id}/>
      </Layout>
      </>
    );
}

export default Project;


