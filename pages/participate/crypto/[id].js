import { useRouter } from 'next/router'
import Layout from '../../../app/components/layout/index'
import HeadBlock from '../../../app/components/head/Head'
import ParticipatePage from '../../../app/components/participate/ParticipatePage'
import fetchProject from '../../../app/services/fetchProject'

export async function getServerSideProps(context) {
  const {project} = await fetchProject(context.params.id,'crypto')

  return {
    props: {project}, 
  }
}

const Participate = ({project}) => {
    const router = useRouter()
    const { id } = router.query
    
    return (
      <>
      <HeadBlock title={'Participate'}/>
      <Layout>
        <ParticipatePage type={'crypto'} project={project} id={id}/>
      </Layout>
      </>
    );
}

export default Participate;
