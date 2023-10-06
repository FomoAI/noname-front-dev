import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import CalendarPage from '../app/components/calendarPage/CalendarPage'
import getCalendar from '../app/admin/services/calendarServices/getCalendar'

export async function getServerSideProps() {
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

export default function Calendar({calendar}) {
  return (
    < >
      <HeadBlock title={'Calendar'}/>
      <Layout>
        <CalendarPage dates={calendar}/>
      </Layout>
    </>
  )
}
