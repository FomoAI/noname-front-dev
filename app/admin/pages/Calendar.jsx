import { useState , useCallback , useEffect} from 'react'
import styles from '../styles/calendar.module.scss'
import useProjects from '../../hooks/useProjects'
import DateItem from '../components/dateItem/DateItem'
import AddBtn from '../UI/AddBtn'
import editCalendar from '../../admin/services/calendarServices/editCalendar'
import deleteCalendar from '../../admin/services/calendarServices/deleteCalendar'
import createCalendar from '../../admin/services/calendarServices/createCalendar'
import Loader from '../../assets/components/loader/Loader'
import { useRouter } from 'next/router'

const Calendar = ({calendar}) => {
    const [loading,setLoading] = useState(false)
    const [selectedDate,setSelectedDate] = useState({})
    const [dates,setDates] = useState([])
    const {allProjects} = useProjects({})
    const router = useRouter()

    const datesHandler = useCallback((action) => {
        if(action === 'add'){
            setDates((state) => 
            [{localid:Date.now(),date: new Date().toLocaleDateString(),projects:[]},...state]
            )
        }
    },[dates])

    const changeDate = useCallback((name,date,id) => {
        setDates((state) => {
            return(
                state.map(((item) => {
                    if(item.localid === id){
                        return {...item,[name]:date}
                    }
                    return item
                }))
            )
        })
    },[dates])

    const projectsHandler = useCallback((id,project) => {
        if(project){
            setDates((state) => {
                return(
                    state.map((date) => {
                        if(date.localid === id && !date.projects.includes(project)){
                            return {...date,projects: [...date.projects,project]}
                        }else if(date.localid === id && date.projects.includes(project)){
                            return {...date,projects: date.projects.filter((item) => item !== project)}
                        }
                        return date
                    })
                )
            })
            return
        }
    },[dates])

    const save = async (id,data) => {
        try{
            if(id){
                const {success} = await editCalendar(id,data)
                if(success){
                    router.reload()
                }
            }else{
                const {success} = await createCalendar(data)
                if(success){
                    router.reload()
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    const remove = async (id,localid) => {
        try{
            if(!id && localid){
                setDates((state) => {
                    return (
                        state.filter((date) => {
                            return date.localid !== localid
                        })
                    )
                })
                return
            }
            const {success} = await deleteCalendar(id)
            if(success){
                router.reload()
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(calendar){
            console.log(calendar);
            setDates(calendar.reverse())
        }
    }, [calendar]);

    if(loading){
        <Loader/>
    }
    
    return (
        <>
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.title}>
                    <h1>Calendar</h1>
                </div>
                <div className={styles.save}>
                </div>
            </div>
            <div className={styles.add}>
                <AddBtn handler={() => datesHandler('add')} text='+'/>
            </div>
    
            <div className={styles.dates}>
                {dates.map((item,index) => {
                    return (
                    <DateItem
                    index={index}
                    remove={remove}
                    save={save}
                    projects={allProjects}
                    key={index} 
                    dateItem={item} 
                    projectsHandler={projectsHandler}
                    datesHandler={changeDate}/>
                    )
                    
                })}
            </div>
        </div>
        </>
    );
}

export default Calendar;
