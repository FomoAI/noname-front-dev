import { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/create-gallery.module.scss'
import AddBtn from '../../UI/AddBtn'
import Input from '../../UI/Input'
import FileInput from '../../UI/FileInput'
import loader from '../../../utils/loader'

export default function CreateGallery({title,items,name,handler}) {
    const [galleryItems, setGalleryItems] = useState(() => items);

    const addItem = () => {
        setGalleryItems((state) => [{href:'',img : '',localid:Date.now()},...state])
    }

    const removeItem = (id) => {
        setGalleryItems((state) => state.filter((item) => item.localid !== id))
    }

    const inputHandler = useCallback((_,value,target) => {
        setGalleryItems((state) => {
            return (
                state.map((item) => {
                    if(item.localid === target){
                        return {...item,href:value}
                    }
                    return item
                })
            )
        })
    },[galleryItems])

    const fileHandler = useCallback((event,target,oldImg) => {
        setGalleryItems((state) => {
            return (
                state.map( (item) => {
                    if(item.localid === target){
                        const file = event.target.files[0]
                        return {...item,img:file,oldImg}
                    }
                    return item
                })
            )
        })
    },[galleryItems])

    useEffect(() => {
        handler(name,galleryItems)
    },[galleryItems])

  return (
    <div className={styles.body}>
        <div className={styles.title}>
            <h4>
            {title}
            </h4>            
        </div>
        <div className={styles.items}>
            {galleryItems.map((item) => {
                return (
                    <div key={item.localid} className={styles.card}>
                        <div className={styles.img}>
                            {
                                item.img
                                ?
                                <img
                                alt='img'
                                src={
                                    typeof item.img === 'string' 
                                    ? loader(item.img) 
                                    : URL.createObjectURL(item.img)}
                                />
                                :
                                ''
                            }
                        </div>
                        <FileInput
                        oldValue={item.oldImg}
                        index={item.localid}
                        handler={fileHandler}
                        label={
                            item.img
                            ?
                            'Change logo (166x56)'
                            :
                            'Add logo (166x56)'
                        }
                        name={'img'}
                        />
                        <Input
                        index={item.localid}
                        handler={inputHandler}
                        placeholder='https://example.com'
                        value={item.href}
                        name={'href'}
                        />
                        <button onClick={() => removeItem(item.localid)}>
                            Remove
                        </button>
                    </div>
                )
            })}
            <AddBtn handler={addItem}/>
        </div>
    </div>
  )
}
