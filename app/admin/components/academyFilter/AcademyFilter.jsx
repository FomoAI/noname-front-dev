import { useEffect, useState } from "react"
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn"

import styles from '../../styles/academy-filter.module.scss'

const engItems = [
    {
        name:"main",
        selected:true,
        text:'Main'
    },
    {
        name:"directions",
        selected:false,
        text:'Directions'
    },
    {
        name:"coursesinfo",
        selected:false,
        text:'Courses Info'
    },
    {
        name:"studyformat",
        selected:false,
        text:'Study Format'
    },
    {
        name:"courses",
        selected:false,
        text:'Courses'
    },
    {
        name:"authors",
        selected:false,
        text:'Authors'
    },
    {
        name:"reviews",
        selected:false,
        text:'Reviews'
    },
]

const uaItems = [
    {
        name:"main",
        selected:true,
        text:'Головна інформація'
    },
    {
        name:"directions",
        selected:false,
        text:'Напрямки'
    },
    {
        name:"coursesinfo",
        selected:false,
        text:'Інформація про курси'
    },
    {
        name:"studyformat",
        selected:false,
        text:'Форма навчання'
    },
    {
        name:"courses",
        selected:false,
        text:'Курси'
    },
    {
        name:"authors",
        selected:false,
        text:'Автори'
    },
    {
        name:"reviews",
        selected:false,
        text:'Відгуки'
    },
]

export default function AcademyFilter({handler,lang}) {
    const [isOpen,setIsOpen] = useState(false)
    const [filters,setFilters] = useState(
        engItems
    )

    const selectedSection = (section) => {
        setFilters((prev) => {
            return (
                prev.map((filter) => {
                    if(filter.name === section.name){
                        return {...filter,selected:true}
                    }
                    
                    return {...filter,selected:false}
                })
            )
        })
        setIsOpen(false)
        handler(section.name)
    }

    useEffect(() => {
        setFilters(
        lang === 'ENG'
        ?
        engItems
        :
        uaItems )
    },[lang])

  return (
    <div className={styles.body}>
        <div className={styles.open}>
            <SquareBtn
            handler={() => setIsOpen((prev) => !prev)}
            text={
                lang === 'ENG'
                ?
                'Section'
                :
                'Розділи'
                }
            />
        </div>
            {
            isOpen
            ?
            <div className={styles.items}>
            {
                filters.map((item,index) => {
                    return (
                        <SquareBtn 
                        height="75"
                        handler={() => selectedSection(item)}
                        type={item.selected ? 'red' : ''}
                        text={item.text}
                        key={index}/>
                    )
                })
            }
            </div>
            :
            <></>
            }
    </div>
  )
}
