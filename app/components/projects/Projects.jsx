import { useCallback, useState , useEffect} from 'react'
import { getNoNameNFTBalance } from '../../smart/initialSmartMain'
import getProjectsSmartData from '../../services/getProjectsSmartData'
import Project from '../project/Project'
import LoaderCustom from '../../assets/components/loader/Loader'
import styles from '../styles/projects.module.scss'

const filtersInitialState = [
    {
        title:'Active',
        isSelect:true,
    },
    {
        title:'Upcoming',
        isSelect:false,
    },
    {
        title:'Ended',
        isSelect:false,
    },
]

export default function Projects({type,allProjects}) {
    const [loading,setLoading] = useState(false)
    const [filters,setFilters] = useState([])
    const [filter,setFilter] = useState('Active')
    const [projects,setProjects] = useState([])
    const [isNftAccess,setIsNftAccess] = useState(false)

    const filtersHandler = useCallback((event) => {
        if(event.target.id === 'block') return 

        setLoading(true)

        const target = event.target.textContent

        setFilters(filters.map((filter) => {
            if(filter.title === target){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))

        setFilter(target)

        const filteredProjects = allProjects.filter((pr) => {
            return pr.status?.toLowerCase() === target.toLowerCase()
        })
        setProjects(getProjectsSmartData(filteredProjects).then(({projects}) => {
            setProjects(projects)
            setLoading(false)
        }))

    },[filters,filter])

    useEffect(() => {
        if(!allProjects?.length) return

        const initialProjectsPage = async () => {
            setLoading(true)

            const availableFilters = filtersInitialState.filter((filter) => {
                return allProjects.find((item) => {
                    return item.status?.toLowerCase() === filter.title?.toLowerCase()
                })
    
            })  
   
            if(!availableFilters?.length){
                setLoading(false)
                
                return
            }
    
            const currentFilter = availableFilters[0].title
    
            setFilter(currentFilter)
            setFilters(availableFilters.map((filter) => {
                    if(filter.title === currentFilter){
                        return {...filter,isSelect:true}
                    }
                    return {...filter,isSelect:false}
            }))
    
            const filteredProjects = allProjects.filter((pr) => {
                return pr.status?.toLowerCase() === currentFilter.toLowerCase()
            })

            const {sum} = await getNoNameNFTBalance(window.ethereum.selectedAddress)
            const {projects} = await getProjectsSmartData(filteredProjects?.reverse() || [])

            setIsNftAccess(Number(sum) > 0)
            setProjects(projects)

            setLoading(false)
        }

        initialProjectsPage()
    }, []);

    if(loading){
        return <LoaderCustom/>
    }

  return (
    <div className={styles.projects}>
        <div id='block' onClick={filtersHandler} className={styles.filters}>
            {filters.map((filterItem) => {
                return (
                    <button 
                    className=
                    {
                        filterItem.title.toLowerCase() === filter.toLowerCase()
                        ? styles.filterBtnSelected 
                        : 
                        styles.filterBtn
                    } 
                    key={filterItem.title}>
                        {filterItem.title}
                    </button>
                )
            })}
        </div>
       <div className={styles.projectsItems}>
        
       {
        projects?.length
        ?
        projects.map((pr,index) => {
            return <Project isNftAccess={isNftAccess} type={type} key={index} filter={filter} project={pr} index={index}/>
        })
        :
        <></>    
        } 
       </div>
    </div>
  )
}
