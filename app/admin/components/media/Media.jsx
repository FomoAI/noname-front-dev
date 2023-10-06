import { useState,useEffect,useCallback } from 'react'
import Image from 'next/image'
import AddBtn from '../../UI/AddBtn'
import Input from '../../UI/Input'
import CloseSvg from '../../../assets/icons/close.svg'
import styles from '../../styles/media.module.scss'

export default function Media({value,handler,name}) {
    const [items,setItems] = useState([])

    const inputsHandler = useCallback((value,target) => {
        setItems((state) => state.map((tag,index) => {
            if(index === target){
                return value
            }
            return tag
        }))
    },[items])

    const removeItem = (target) => {
        setItems((state) => state.filter((tag,i) => target !== i))
    }

    const addItem = () => {
        setItems((state) => [...state,''])
    }

    useEffect(() => {
        handler(name,items)
    },[items])

    useEffect(() => {
        if(value.length){
            setItems(value)
            value = []
            return
        }
    },[value])


  return (
    <div className={styles.body}>
        <div className={styles.label}>
            Media:
        </div>
        <div className={styles.items}>
        {
            items.map((item,index) => {
                return (
                    <div className={styles.item} key={index}>
                        <Input
                        handler={(name,value) => inputsHandler(value,index)}
                        value={item}
                        name={index}
                        />
                        <button 
                        onClick={() => removeItem(index)}
                        className={styles.removeItem}>
                            <Image src={CloseSvg} alt="remove item"/>
                        </button>
                    </div>
                )
            })
        }
            <div className={styles.addBtn}>
                <AddBtn
                handler={() => addItem()}
                />
            </div>
        </div>
    </div>
  )
}
