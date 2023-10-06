import HeadBlock from '../../../../app/components/head/Head'
import Layout from '../../../../app/admin/components/layout/index'
import CreateNews from '../../../../app/admin/components/createNews/CreateNews'

export default function AdminNews({}) {

    return (
      < >
        <HeadBlock title={'Admin - Create News'}/>
        <Layout>
            <CreateNews/>
        </Layout>
      </>
    )
  }
  