import { useState,useEffect, useCallback } from "react"
import styles from '../../styles/tags.module.scss'


export default function CreateTags({value,handler,name}) {
    const [tags,setTags] = useState([])

    const inputsHandler = useCallback((value,target) => {
        setTags((state) => state.map((tag,index) => {
            if(index === target){
                return {...tag,value:value}
            }
            return tag
        }))
    })

    const removeTag = (target) => {
        setTags((state) => state.filter((tag,i) => target !== i))
    }

    const addTag = () => {
        setTags((state) => [...state,{value:''}])
    }

    useEffect(() => {
        handler(name,tags)
    },[tags])

    useEffect(() => {
        if(value.length){
            setTags(value)
            value = []
            return
        }
    },[value])

  return (
    <div className={styles.tags}>
        <div className={styles.tagsItems}>
            {tags.map((tag,index) => 
                <div key={index} className={styles.tagItem}>
                    <div className={styles.tagInput}>
                        <span>#</span>
                        <input 
                        value={tag.value} 
                        onChange={(e) => inputsHandler(e.target.value,index)}
                        />
                    </div>
                    <button onClick={() => removeTag(index)} className={styles.tagRemove}>
                        Remove
                    </button>
                </div>
            )}
            <div className={styles.addBtn}>
                <button onClick={addTag}>+</button>
            </div>
        </div>
    </div>
  )
}
