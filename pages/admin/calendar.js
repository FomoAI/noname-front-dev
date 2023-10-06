import HeadBlock from '../../app/components/head/Head'
import Layout from '../../app/admin/components/layout/index'
import getCalendar from '../../app/admin/services/calendarServices/getCalendar'
import Calendar from '../../app/admin/pages/Calendar'

export async function getServerSideProps(ctx) {
  try{
    const {calendar} = await getCalendar()

    if(!calendar){
      return { props: { calendar :[]} }
    }
    return { props: { calendar} }
    
  }catch(error){
    return { props: { calendar:[] } }
  }
}
export default function AdminCalendar({calendar}) {
  return (
    < >
      <HeadBlock title={'Admin - Calendar'}/>
      <Layout>
        <Calendar calendar={calendar}/>
      </Layout>
    </>
  )
}
