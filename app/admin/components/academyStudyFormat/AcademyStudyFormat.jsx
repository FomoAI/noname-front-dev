import { useState, useContext, useEffect } from 'react'
import { LangContext } from '../../pages/Academy'
import Input from '../../UI/Input'
import TextAreaCustom from '../../UI/TextAreaCustom'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import FileInput from '../../UI/FileInput'
import loader from '../../../utils/loader'
import AddBtn from '../../UI/AddBtn'
import updateFormats from '../../services/academyServices/studyFormats/updateFormats'
import getFormats from '../../services/academyServices/studyFormats/getFormats'
import getDataByLang from '../../../utils/getDataByLang'
import LoaderCustom from '../../../assets/components/loader/Loader'
import styles from '../../styles/study-format.module.scss'

export default function AcademyStudyFormat() {
    const [data,setData] = useState()

    const lang = useContext(LangContext)

    const inputsHandler = (name,value) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    [name]:value
                }
            )
        })
    }

    const itemInputHandler = (itemIndex,value) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.map((item,index) => {
                        if(index === itemIndex){
                            return (
                                {
                                    ...item,
                                    text:value
                                }
                            )
                        }

                        return item
                    })
                }
            )
        })
    }

    const fileInputHandler = (e,itemIndex) => {
        const file = e.target.files[0]
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.map((item,index) => {
                        if(index === itemIndex){
                            return (
                                {...item,img:file} 
                            )
                        }

                        return item
                    })
                }
            )
        })
    }

    const addItem = () => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:[...prev.items,{img:null,text:''}]
                }
            )
        })
    }

    const removeItem = (itemIndex) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.filter((item,index) => {
                        return itemIndex !== index
                    })
                }
            )
        })
    }

    const confirmUpdate = async () => {
        try{
            const formData = new FormData()
            const items = []

            for (const key in data) {
                if(key === 'items'){

                    for (let i = 0; i < data.items.length; i++) {
                        const item = data.items[i]
                        
                        if(item.img && typeof item.img !== 'string'){
                            const imgName = `Img${i}`

                            formData.append(imgName,item.img)

                            items.push({...item,img:imgName})
                        }else{
                            items.push(item)
                        }
                    }

                    formData.append(`${key}_${lang}`,JSON.stringify(items))
                }else{
                    formData.append(`${key}_${lang}`,data[key])
                }
            }


            await updateFormats('65044e9febcd2bafad279986',formData,lang)

            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getFormats().then(({success,studyFormats}) => {
            setData(getDataByLang(studyFormats,lang,'_'))
        })
    },[lang])

    if(!data){
        return <LoaderCustom/>
    }

  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <h2>
                {
                    lang === 'ENG'
                    ?
                    'Study formats:'
                    :
                    'Формати навчання'
                }
            </h2>
            <SquareBtn
            width='250'
            handler={confirmUpdate}
            text={
                lang === 'ENG'
                ?
                'Confirm changes'
                :
                'Підтвердити зміни'
            }
            />
        </div>
        <div className={styles.title}>
            <Input
            value={data.title}
            label={'Title:'}
            name={'title'}
            handler={inputsHandler}
            />
        </div>
        <div className={styles.description}>
            <TextAreaCustom
            value={data.description}
            label={'Description:'}
            name={'description'}
            handler={inputsHandler}
            />
        </div>
        <div className={styles.itemsTitle}>
            Formats:
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <button 
                            onClick={() => removeItem(index)}
                            className={styles.removeBtn}>
                                Remove
                            </button>
                            <div className={styles.itemText}>
                                <Input
                                label={'Text:'}
                                value={item.text}
                                handler={(name,value) => {
                                    if(value.length < 48){
                                        itemInputHandler(index,value)
                                    }
                                }}
                                />
                            </div>
                            <div className={styles.itemImg}>
                                <div className={styles.imgWrapper}>
                                    {
                                        item.img 
                                        ?
                                        <img 
                                        src={
                                            typeof item.img === 'string'
                                            ?
                                            loader(item.img)
                                            :
                                            URL.createObjectURL(item.img)
                                        } 
                                        alt={item.text}
                                        />
                                        :
                                        <></>
                                    }
                                </div>
                                <FileInput
                                value={item.img}
                                handler={(e) => fileInputHandler(e,index)}
                                label={'Image: 290x233'}
                                />
                            </div>
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
