import HeadBlock from '../../../../app/components/head/Head'
import Layout from '../../../../app/admin/components/layout/index'
import CreateSlide from '../../../../app/admin/components/createSlide/CreateSlide'

export default function AdminSlide({}) {

    return (
      < >
        <HeadBlock title={'Admin - Create Slide'}/>
        <Layout>
            <CreateSlide action={'Create'}/>
        </Layout>
      </>
    )
  }
  