import { useRouter } from 'next/router'
import Layout from '../../app/components/layout/index'
import HeadBlock from '../../app/components/head/Head'
import ProjectPage from '../../app/components/projectPage/ProjectPage'
import fetchProject from '../../app/services/fetchProject'

export async function getServerSideProps(context) {
  const {project} = await fetchProject(context.params.id,'donate')

  return {
    props: {project}, 
  }
}

const Donate = ({project}) => {
    const router = useRouter()
    const { id } = router.query
    
    return (
      <>
        <HeadBlock title={'Project Page'}/>
      <Layout>
        <ProjectPage project={project} isDonate={true} id={id}/>
      </Layout>
      </>
    );
}

export default Donate;
