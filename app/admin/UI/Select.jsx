import { useState ,useEffect} from 'react'
import styles from '../styles/select.module.scss'

export default function Select({items,handler,name,value,custom = false,id}) {
    const [select,setSelect] = useState(0)

    const changeSelectedValue = (index,item) => {
        setSelect(index)
        handler(name,item,id)
    }

    useEffect(() => {
        if(custom){
            switch(value){
                case 'upcoming':
                    setSelect(2)
                break;
                case 'inwork':
                    setSelect(1)
                break;
                default:
                    setSelect(0)
            }
            return
        }
        switch(value){
            case 'Upcoming':
                setSelect(1)
            break;
            case 'Ended':
                setSelect(2)
            break;
            default:
                setSelect(0)
            
        }
    }, [value]);

  return (
    <div className={styles.body}>

        <div className={styles.items}>
            {items.map((item,index) =>{
                if(select === index){
                    return (
                    <button 
                    key={item} 
                    className={styles.item + ' ' + styles.selected}>
                    {item}
                    </button>
                    )
                }
                return (
                    <button 
                    key={item} 
                    onClick={() => changeSelectedValue(index,item)} 
                    className={styles.item}>
                    {item}
                    </button>
                )
            })}
        </div>
    </div>
  )
}
