import { useCallback , useState, useEffect} from 'react'
import styles from '../../styles/documentation.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import TextEditor from '../textEditor/TextEditor'

export default function FooterLinks({name,handler,projectLinks}) {
    const [links,setLinks] = useState([])

    const addLink = () => {
        setLinks([...links,{name:'',text:''}])
    }

    const linkHandler = useCallback((event,target) => {
        setLinks(links.map((item,index) => {
            if(index === target){
                return {...item,[event.target.id] : event.target.value}
            }
            return item
        }))
    },[links])

    const linkTextHandler = useCallback((name,text,target) => {
        if(text === links[target].text){
            return 
        }
        setLinks(links.map((item,index) => {
            if(index === target){
                return {...item,[name] : text}
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
    },[])

  return (
    <div className={styles.body}>
        {links.map((link,index) => {
            return (
                <div key={index} className={styles.link + ' ' + styles.footerLink}>
                    <input 
                    onChange={(event) => linkHandler(event,index)} 
                    type="text" 
                    value={link.name} 
                    id={'name'} 
                    placeholder={'Link name'}/>
                    <TextEditor
                    value={link.text} 
                    index={index}
                    name={'text'}
                    handler={linkTextHandler}
                    />
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
