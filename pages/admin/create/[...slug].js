import HeadBlock from '../../../app/components/head/Head'
import Layout from '../../../app/admin/components/layout/index'
import CreateProject from '../../../app/admin/components/createProject/CreateProject'
import { useRouter } from 'next/router'

export default function project() {
  const router = useRouter()
  const {slug} = router.query
  const projectInfo = []
  if(slug){
    projectInfo.push(...slug)
  }
  
  return (
    < >
      <HeadBlock title={'Admin'}/>
      <Layout>
        <CreateProject type={projectInfo[0]} status={projectInfo[1]} id={projectInfo[2]}/>
      </Layout>
    </>
  )
}
