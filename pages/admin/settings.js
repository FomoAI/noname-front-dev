import { useState ,useEffect} from 'react'
import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import Settings from '../../app/admin/pages/Settings'
import getHeader from '../../app/admin/services/headerServices/getHeader'
import getFooter from '../../app/admin/services/footerServices/getFooter'
import Loader from '../../app/assets/components/loader/Loader'

export default function AdminSettings() {
  const [loading,setLoading] = useState(true)
  const [header,setHeader] = useState(null)
  const [footer,setFooter] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try{
        const {header} = await getHeader()
        const {footer} = await getFooter()
        setHeader(header)
        setFooter(footer)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
     getData()
  },[])

  return (
    < >
      <HeadBlock title={'Admin - Settings'}/>
      <Layout>
        {
          loading
          ?
          <Loader/>
          :
          <Settings header={header} footer={footer}/>
        }
      </Layout>
    </>
  )
}
