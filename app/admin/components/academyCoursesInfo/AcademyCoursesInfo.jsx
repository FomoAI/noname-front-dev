import { useState, useContext, useEffect} from 'react'
import { LangContext } from '../../pages/Academy'
import Input from '../../UI/Input'
import TextAreaCustom from '../../UI/TextAreaCustom'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import AddBtn from '../../UI/AddBtn'
import getCoursesInfo from '../../services/academyServices/coursesInfo/getCoursesInfo'
import updateCoursesInfo from '../../services/academyServices/coursesInfo/updateCoursesInfo'
import getDataByLang from '../../../utils/getDataByLang'
import LoaderCustom from '../../../assets/components/loader/Loader'
import styles from '../../styles/courses-info.module.scss'

export default function AcademyCoursesInfo() {
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
                    items:data.items.map((item,index) => {
                        if(index === itemIndex){
                            return value
                        }

                        return item
                    })
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
                        return index !== itemIndex
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
                    items:[...prev.items,{title:'',description:''}]
                }
            )
        })
    }

    const confirmUpdate = async () => {
        try{
            const coursesInfoData = {}

            for (const key in data) {
                const value = data[key]

                coursesInfoData[`${key}_${lang}`] = value
            }

            const {success} = await updateCoursesInfo('650442f42fd123d9b2d24d55',coursesInfoData,lang)

            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getCoursesInfo().then(({success,coursesInfo}) => {
            if(success){
                setData(getDataByLang(coursesInfo,lang,'_'))
            }
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
                'Courses info'
                :
                'Інформація про курси'
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
            Info:
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
                            <div className={styles.itemTitle}>
                                <Input
                                handler={(name,value) => itemInputHandler(index,{...item,title:value})}
                                label={'Title:'}
                                value={item.title}
                                />
                            </div>
                            <div className={styles.itemDescription}>
                                <TextAreaCustom
                                handler={(name,value) => itemInputHandler(index,{...item,description:value})}
                                label={'Description:'}
                                value={item.description}
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
