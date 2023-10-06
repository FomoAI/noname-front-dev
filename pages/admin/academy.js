import AcademyAdminPage from '../../app/admin/pages/Academy'
import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'

export default function AdminAcademy() {
  return (
    < >
      <HeadBlock title={'Admin - Academy'}/>
      <Layout>
        <AcademyAdminPage/>
      </Layout>
    </>
  )
}
