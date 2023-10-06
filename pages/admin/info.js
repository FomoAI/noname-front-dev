import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import Info from '../../app/admin/pages/Info'
import getInfo from '../../app/admin/services/infoServices/getInfo'

export async function getServerSideProps() {
  try{
    const {info} = await getInfo()
    if(!info.length){
      return { props: { info :[]} }
    }
    return { props: { info } }
    
  }catch(error){
    return { props: { info:[] } }
  }
}

export default function AdminInfo({info}) {
  return (
    < >
      <HeadBlock title={'Admin - Info'}/>
      <Layout>
        <Info data={info[0]}/>
      </Layout>
    </>
  )
}