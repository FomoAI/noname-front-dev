import { useMemo , useState , useCallback,useEffect} from 'react'
import styles from './project-filter.module.scss'
import Image from 'next/image'
import loader from '../../../utils/loader'
import icons from '../../icons/socialmedia/socialmedia'

export default function ProjectFilter({filtersInitialState,project}) {
    const [filters,setFilters] = useState(filtersInitialState)
    const [filter,setFilter] = useState(filtersInitialState[0].title)

    const filtersHandler = useCallback((event) => {
        if(event.target.id === 'block') return 
    
        const target = event.target.textContent
        setFilters(filters.map((filter) => {
            if(filter.title === target){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))
        setFilter(target)
      },[])

    const data = useMemo(() => {
        return project[filter.toLowerCase()]
    },[filter]) 

    useEffect(() => {
        const actualFilter = filters
        .find((filter) => {
            return (
                project[filter.title.toLowerCase()].length
            )
        })
        setFilter(actualFilter?.title || '')
        setFilters(filters.map((filter) => {
            if(filter.title === actualFilter){
                return {...filter,isSelect:true}
            }
            return {...filter,isSelect:false}
        }))
    },[])

  return (
    <>
    <div id='block' onClick={filtersHandler} className={styles.filters}>
    {filters.filter((filter) => project[filter.title.toLowerCase()].length)
    .map((filterItem,index) => {
            return (
            <button 
            className={
                filterItem.title.toLowerCase() === filter.toLowerCase() 
                ? styles.filterBtnSelected 
                : styles.filterBtn
            } 
            key={filterItem.title}>
                {filterItem.title}
            </button>
        )
    })}
    </div>
    <div className={styles.infoBlock}>
        {data?.length 
        ? 
        data.map((item,index) => {
            return (
                <div key={index} className={styles.item}>
                    <div className={styles.img}>
                        {
                            item.img
                            ?
                            <Image loader={() => loader(item.img)} width={'64'} height={'64'} src={item.img} alt={item.name}/>                        
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.name}>
                        {item.name}
                    </div>
                    <div className={styles.text}>
                        {item.subtitle}
                    </div>
                    <div className={styles.description}>
                        {item.text}
                    </div>
                    <div className={styles.socialmedia}>
                        {
                         item.twitter
                         ?
                         <div className={styles.socialitem}>
                             <a href={item.twitter} target='_blank'>
                             <Image width={'20'} src={icons.twitter} alt='twitter'/>
                             </a>
                         </div>
                         :
                         <></>
                        }
                        {
                         item.linkedin 
                         ?
                         <div className={styles.socialitem}>
                             <a href={item.linkedin} target='_blank'>
                             <Image width={'20'} src={icons.linkedin} alt='linkedin'/>
                             </a>
                         </div>
                         :
                         <></>
                        }
                        {
                         item.facebook 
                         ?
                         <div className={styles.socialitem}>
                             <a href={item.facebook} target='_blank'>
                             <Image width={'20'} src={icons.facebook} alt='facebook'/>
                             </a>
                         </div>
                         :
                         <></>
                        }
                    </div>
                </div>
            )
        })
        :
        <></>
        }
    </div>
    </>
  )
}
