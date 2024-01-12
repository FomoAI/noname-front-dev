import { useState , useEffect, useRef} from "react"
import Image from "next/image"
import icon from '../../icons/calendar/calendarIcon.svg'
import Calendar from 'react-calendar';
import { Transition } from "react-transition-group";
import styles from './calendar.module.scss'

const years = []

export default function BidsCalendar({dates,stateHandler,name,range = true,id,isOpen = false,setIsOpen}) {
    const [isChange,setIsChange] = useState(false)
    const [localState,setLocalState] = useState({
        from:'',
        to:''
    })
    const calendar = useRef(null)
    
    const transitionStyles = {
        entering: { opacity: 1 ,visibility:'visible'},
        entered:  { opacity: 1 ,visibility:'visible'},
        exiting:  { opacity: 0 ,visibility:'hidden'},
        exited:  { opacity: 0 ,visibility:'hidden'},
      };
    
    const confirmDates = () => {
        if(!range && !localState?.length) return

        setIsOpen(false)
        if(range){
            stateHandler(name,
                {
                    from:localState.from,
                    to:localState.to
                },
                id
            )
        }else{
            stateHandler(name,localState,id)
        }
      
    }

    const datesHandler = (event) => {
        if(range){
            setLocalState({
                from:event[0].toLocaleDateString(),
                to:event[1].toLocaleDateString()
            })
        }else{
            setLocalState(event.toLocaleDateString())
        }
    }
    
    useEffect(() => {
        if(isOpen){
            const monthNode = document.querySelector('.react-calendar')
            .querySelector('.react-calendar__navigation__label__labelText--from')
            const month = monthNode.textContent.split(' ')[0].slice(0,3)
            const year = monthNode.textContent.split(' ')[1]
            monthNode.textContent = month + ', ' + year
        }
    },[isOpen,isChange])

  return (
            <Transition nodeRef={calendar} in={isOpen} timeout={1000}>
            {state => (
            <div ref={calendar} style={{...transitionStyles[state]}} className={styles.body + " " + styles.bids}> 
                <Calendar 
                onChange={datesHandler} 
                selectRange={range} 
                onActiveStartDateChange={() => setIsChange(!isChange)} locale="eng" />
                <button onClick={confirmDates} className={styles.apply}>Apply</button>
                <button className={styles.fake}></button>
            </div>
            )}
            </Transition>
  )
}
