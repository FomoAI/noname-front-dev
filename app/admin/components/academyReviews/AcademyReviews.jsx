import { useState, useCallback,useEffect, useContext} from 'react'
import { LangContext } from '../../pages/Academy'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import Input from '../../UI/Input'
import FileInput from '../../UI/FileInput'
import Calendar from '../../../assets/components/calendar/Calendar'
import loader from '../../../utils/loader'
import LoaderCustom from '../../../assets/components/loader/Loader'
import TextAreaCustom from '../../UI/TextAreaCustom'
import AddBtn from '../../UI/AddBtn'
import getDataByLang from '../../../utils/getDataByLang'
import getReviews from '../../services/academyServices/reviews/getReviews'
import updateReview from '../../services/academyServices/reviews/updateReview'
import styles from '../../styles/reviews.module.scss'

export default function AcademyReviews() {
    const [data,setData] = useState()

    const lang = useContext(LangContext)

    const addReview = () => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:[
                        ...prev.items,
                        {
                            img:'',
                            date:new Date().toDateString(),
                            name:'',
                            body:``
                        }
                    ]
                }
            )
        })
    }

    const inputsHander = (name,value,reviewIndex) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.map((review,rIndex) => {
                        if(rIndex === reviewIndex){
                            return {...review,[name]:value}
                        }
                        
                        return review
                    })
                }
            )
        })
    }

    const fileInputHandler = (e,reviewIndex) => {
        const file = e.target.files[0]
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.map((review,rIndex) => {
                      if(rIndex === reviewIndex){
                        return (
                          {
                            ...review,
                            img:file
                          }
                        )
                      }
  
                      return review
                    })
                }
            )
        })
    }

    const removeReview = useCallback((reviewIndex) => {
        setData((prev) => {
            return {
                ...prev,
                items:prev.items.filter((review,rIndex) => {
                    return rIndex !== reviewIndex
                })
            }
        })
    },[data])

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

                    formData.append(`items_${lang}`,JSON.stringify(items))
                }else{
                    formData.append(`${key}_${lang}`,data[key])
                }
            }
            
            await updateReview('6504694cec059f3137e95434',formData,lang)
  
            window.location.reload()
  
        }catch(error){
            console.log(error)
        }
    }
  
    useEffect(() => {
        getReviews('6504694cec059f3137e95434').then(({success,reviews}) => {
            if(success){
                const currentLangData = getDataByLang(reviews,lang,'_')
  
                setData(currentLangData)
            }
          })
    },[lang])
  
    if(!data?.items?.length){
        return <LoaderCustom/>
    }

  return (
    <div className={styles.body}>
        <div className={styles.head}>
            <h2>
                {
                lang === 'ENG'
                ?
                'Reviews'
                :
                'Відгуки'
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
            name={'title'}
            label={'Title:'}
            value={data.title}
            handler={(name,value) => setData((prev) => {
              return {...prev,[name]:value}
            })}
            />
        </div>
        <div className={styles.items}>
            {
                data.items.map((item,index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <div className={styles.imgWrapper}>
                                {
                                    item.img
                                    ?
                                    <img src={
                                        typeof item.img === 'string'
                                        ?
                                        loader(item.img)
                                        :
                                        URL.createObjectURL(item.img)
                                    } 
                                    alt={item.name}/>
                                    :
                                    <></>
                                }
                            </div>
                            <div className={styles.imgInput}>
                                <FileInput
                                handler={(e) => fileInputHandler(e,index)}
                                label={'Review author image: 32x32'}
                                name='img'
                                />
                            </div>
                            <div className={styles.date}>
                                <div className={styles.label}>
                                    Review date:
                                </div>
                                <Calendar
                                name={'date'}
                                dates={item.date}
                                range={false}
                                stateHandler={(name,date) => inputsHander(name,date,index)}
                                />
                            </div>
                            <div className={styles.name}>
                                <Input
                                label={'Name:'}
                                name={'name'}
                                value={item.name}
                                handler={(name,value) => inputsHander(name,value,index)}
                                />
                            </div>
                            <div className={styles.body}>
                                <TextAreaCustom
                                label={'Body:'}
                                name={'body'}
                                value={item.body}
                                handler={(name,value) => inputsHander(name,value,index)}
                                />
                            </div>
                            <button
                            onClick={() => removeReview(index)}
                            className={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </div>
                    )
                })
            }
            <div className={styles.addBtn}>
                <AddBtn
                handler={addReview}
                />
            </div>
        </div>
    </div>
  )
}
