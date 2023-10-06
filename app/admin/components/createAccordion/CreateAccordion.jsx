import { useCallback, useState , useEffect} from 'react'
import styles from '../../styles/create-acc.module.scss'
import Input from '../../UI/Input'

export default function CreateAccordion({title,items,name,handler}) {
    const [accordionItems,setAccordionItems] = useState(() => items)

    const addItem = () => {
        setAccordionItems((state) => [...state,{title:'',body:''}])
    }

    const removeItem = (target) => {
        setAccordionItems((state) => state.filter((item,index) => index !== target))
    }

    const inputsHandler = useCallback((name,value,target) => {
        setAccordionItems((state) => state.map((item,index) => {
            if(index === target){
                return {...item,[name]:value}
            }
            return item
        }))
    },[accordionItems])


    useEffect(() => {
        handler(name,accordionItems)
    },[accordionItems])

  return (
    <div className={styles.body}>
       <div className={styles.title}>
        {
            title
            ?
            <h4>{title}</h4>
            :
            <></>
        }
        </div>
        <div className={styles.items}>
            {accordionItems.map((item,index) => {
                return (
                    <div key={index} className={styles.itemWrapper}>
                        <div className={styles.index}>
                        {index + 1}
                        </div>
                        <div key={index} className={styles.item}>
                            <Input 
                            handler={inputsHandler}
                            index={index}
                            label={'Section title'}
                            name={'title'}
                            value={item.title}
                            placeholder='Title...'/>
                            <textarea 
                            onChange={(e) => inputsHandler('body',e.target.value,index)}
                            value={item.body}
                            className={styles.textArea}
                            placeholder='Description...' 
                            name="body" 
                            id={index}>
                            </textarea>
                            <button onClick={() => removeItem(index)}>
                                Remove
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className={styles.addBtn}>
            <button onClick={addItem}>
                +
            </button>
        </div>
    </div>
  )
}
