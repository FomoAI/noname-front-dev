import { useMemo, useState } from "react"
import CustomCalendar from "../../assets/components/calendar/Calendar"
import ProjectsDates from "../projectsDates/ProjectsDates"
import parseDate from '../../utils/parseDate'
import Title from '../../assets/components/title/Title'
import useProjects from '../../hooks/useProjects'
import Loader from '../../assets/components/loader/Loader'
import getPastAndFutureDates from "../../utils/getPastAndFutureDates"
import styles from '../styles/calendar-page.module.scss'

export default function CalendarPage({dates}) {
  if(!dates?.length){
    return (
      <div className={styles.empty}>
        <Title title={'Calendar is empty...'}/>
      </div>
    )
  }

  const {allProjects} = useProjects({})
  const {past,future} = getPastAndFutureDates()
  const [selectedDates,setSelectedDates] = useState({
    from:past,
    to:future,
  })
 
  const stateHandler = (name,dates) => {
    setSelectedDates(dates)
  } 

  const filteredProjects = useMemo(() => {
    let result = dates.map((date) => {
      return {
        date:date.date,
        projects:
        allProjects.filter((pr) => date.projects.includes(pr._id))
      }
    })

    result = result.filter((prWithDate) => {
      if(
        parseDate(prWithDate.date) > parseDate(selectedDates.from) 
        ||
        prWithDate.date === selectedDates.from
      ){
        if(
          parseDate(prWithDate.date) < parseDate(selectedDates.to)
          ||        
          prWithDate.date === selectedDates.to 
        ){
          return true
        }
      }
      return false
    })
    
    return result
  },[selectedDates,allProjects])

  if(!allProjects.length){
    return <Loader></Loader>
  }

  return (
    <div className={styles.calendarPage}>
        <div className={styles.calendar}>
          <CustomCalendar dates={selectedDates} stateHandler={stateHandler}/>
        </div>
        {
          filteredProjects.length
          ?
          <ProjectsDates projectsWithDates={filteredProjects.reverse()}/>
          :
          <div className={styles.error}>
            <Title title={'No projects found with given dates...'}/>
          </div>
        }
    </div>
  )
}
