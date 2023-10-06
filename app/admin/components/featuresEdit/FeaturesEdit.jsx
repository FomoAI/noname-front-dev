import {useState,useCallback,useEffect,useContext} from 'react'
import { DataContext } from '../academyMain/AcademyMain'
import Input from '../../UI/Input'
import TextAreaCustom from '../../UI/TextAreaCustom'
import AddBtn from '../../UI/AddBtn'

import styles from '../../styles/about-us.module.scss'

export default function FeaturesEdit({dataInitial,dataHandler,name}) {
    const [data,setData] = useState(dataInitial)

    const dataTmp = useContext(DataContext)

    const addItem = useCallback(() => {
        setData((data) => {
            return (
                [...data,{title:'',description:''}]
            )
        })
    },[data])

    const removeItem = useCallback((itemIndex,itemTitle) => {
        setData((data) => {
            return (
                data.filter((item,index) => {
                    return item.title !== itemTitle && itemIndex !== index
                 })
            )
        })   
    },[data])

    const changeItem = useCallback((itemIndex,itemToChange) => {
        setData((data) => {
            return (
                data.map((item,index) => {
                    if(index === itemIndex){
                        return itemToChange
                    }
                    return item
                })
            )
        })
    },[data])

    useEffect(() => {
        if(dataTmp[name]){
            setData(dataTmp[name])
        }
    },[dataTmp])

    useEffect(() => {
        dataHandler(name,data)
    },[data])

  return (
    <div className={styles.body}>
        <div className={styles.items}>
            {
                data.map((item,index) => {
                    return(
                        <div className={styles.item} key={index}>
                            <div className={styles.title}>
                                <Input
                                name={'title'}
                                value={item.title}
                                label={'Title:'}
                                handler={(name,value) => changeItem(index,{...item,[name]:value})}
                                />
                            </div>
                            <div className={styles.description}>
                                <TextAreaCustom
                                name={'description'}
                                value={item.description}
                                label={'Description:'}
                                handler={(name,value) => changeItem(index,{...item,[name]:value})}
                                />
                            </div>
                            <button 
                            onClick={() => removeItem(index,item.title)}
                            className={styles.removeBtn}>
                                Remove
                            </button>
                        </div>
                    )
                })
            }
            <div className={styles.addBtn}>
               <AddBtn
               handler={addItem}
               />
            </div>
        </div>
    </div>
  )
}
