import { useCallback , useState, useEffect} from 'react'
import styles from '../../styles/documentation.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

export default function DocumentationLinks({projectLinks,handler,name}) {
    const [links,setLinks] = useState([])

    const addLink = () => {
        setLinks([...links,{name:'',link:''}])
    }

    const linkHandler = useCallback((event,target) => {
        setLinks(links.map((item,index) => {
            if(index === target){
                return {...item,[event.target.id] : event.target.value}
            }
            return item
        }))
    },[links])

    const removeLink = useCallback((target) => {
        setLinks(links.filter((link,index) => {
            return index !== target
        }))
    },[links])

    useEffect(() => {
        handler(name,links)
    },[links])

    useEffect(() => {
        if(projectLinks.length){
            setLinks(projectLinks)
            projectLinks = []
        }
    },[projectLinks])

  return (
    <div className={styles.body}>
        {links.map((link,index) => {
            return (
                <div key={index} className={styles.link}>
                    <input 
                    onChange={(event) => linkHandler(event,index)} 
                    type="text" 
                    value={link.name} 
                    id={'name'} 
                    placeholder={'Link name'}/>
                    <input 
                    onChange={(event) => linkHandler(event,index)} 
                    type="text" 
                    value={link.link} 
                    id={'link'} 
                    placeholder={'https://example.com'}/>
                    <button onClick={() => removeLink(index)} className={styles.remove}>
                        Remove
                    </button>
                </div>
            )
        })}
        <div className={styles.addLink}>
          <SquareBtn handler={addLink} text={'+ Add link'}/>
        </div>
    </div>
  )
}
