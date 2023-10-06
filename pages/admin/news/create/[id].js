import HeadBlock from '../../../../app/components/head/Head'
import Layout from '../../../../app/admin/components/layout/index'
import CreateNews from '../../../../app/admin/components/createNews/CreateNews'
import { useRouter } from 'next/router'

export default function AdminNews() {
    const router = useRouter()
    const {id} = router.query

  return (
    < >
      <HeadBlock title={'Admin - Edit News'}/>
      <Layout>
        <CreateNews action={'Edit'} id={id}/>
      </Layout>
    </>
  )
}
