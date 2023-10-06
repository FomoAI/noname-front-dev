import { useCallback,useState,useMemo } from 'react'
import styles from './stats.module.scss'
import Info from '../info/Info'
import ProjectsStatsTable from '../projectsStatsTable/ProjectsStatsTable'


const filtersInitialState = [
    {
        title:'NFT',
        isSelect:true,
        name:'startup'
    },
    {
        title:'Business',
        isSelect:false,
        name:'realestate'
    },
    {
        title:'Crypto',
        isSelect:false,
        name:'crypto'
    },
    
]

export default function ProjectsStats({projects}) {
  const [filters,setFilters] = useState(filtersInitialState)
  const [filter,setFilter] = useState('startup')  

  const filteredProjects = useMemo(() => {
      return projects.filter((project) => project.path === filter)
  },[filter])

  const filterHandler = useCallback((filter) => {
    setFilter(filter.name)
    setFilters((prev) => prev.map((filterPrev) => {
        if(filterPrev.name === filter.name){
            return {...filterPrev,isSelect:true}
        }
        return {...filterPrev,isSelect:false}
    }))
  },[filter,filters])
    

  return (
    <div className={styles.wrapper}>
        <Info 
        title={'Project stats'} 
        text={'Success evaluation of the projects'}
        />
        <div className={styles.filters}>
            {filters.map((filter) => {
                return (
                    <button
                    onClick={() => filterHandler(filter)} 
                    className={filter.isSelect ? styles.filterBtnSelected : styles.filterBtn} 
                    key={filter.title}>
                        {filter.title}
                    </button>
                )
            })}
        </div>
        <ProjectsStatsTable projects={filteredProjects}/>
    </div>
  )
}
