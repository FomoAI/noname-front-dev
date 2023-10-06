import { useState, useCallback, useContext, useEffect, createContext} from 'react'
import { LangContext } from '../../pages/Academy'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import Input from '../../UI/Input'
import TextAreaCustom from '../../UI/TextAreaCustom'
import AddBtn from '../../UI/AddBtn'
import Loader from '../../../assets/components/loader/Loader'
import DirectionItem from './directionItem/DirectionItem'
import updateDirections from '../../services/academyServices/directions/updateDirections'
import getDirections from '../../services/academyServices/directions/getDirections'
import getDataByLang from '../../../utils/getDataByLang'
import styles from '../../styles/academy-directions.module.scss'

export const DirectionsContext = createContext()

export default function AcademyDirections() {
    const [data,setData] = useState()

    const lang = useContext(LangContext)

    const addDirection = () => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:[
                        ...prev.items,
                        {
                            name:'',
                              start:'',
                              format:'',
                              duration:'',
                              description:``,
                              moreTitle:'',
                              moreBottomText:'',
                              moreStatus:'',
                              moreDescription:``,
                              moreBlocks:[
                                  {
                                      title:'',
                                      items:[
                                          '',
                                      ],
                                  },
                              ],
                          },
                    ]
                }
                
            )
        })
    }

    const removeDirection = useCallback((directionIndex,directionName) => {
        const filteredDirections = data.items.filter((item,index) => {
            return Number(index) !== Number(directionIndex) 
        })  

        setData({...data,items:filteredDirections})
    },[data])

    const updateData = useCallback((itemData,itemIndex) => {
        setData((prev) => {
            return (
                {
                    ...prev,
                    items:prev.items.map((item,index) => {
                        if(index === itemIndex){
                            return itemData
                        }

                        return item
                    })
                }
            )
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

                    formData.append(`${key}_${lang}`,JSON.stringify(items))
                }else{
                    formData.append(`${key}_${lang}`,data[key])
                }
            }

            await updateDirections('65031a2d36b2b62140f31341',formData,lang)

            window.location.reload()

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getDirections('65031a2d36b2b62140f31341').then((res) => {
            const currentLangData = getDataByLang(res.directions,lang,'_')

            setData(currentLangData)
        })
    },[lang])
    
    if(!data?.items?.length){
        return <Loader/>
    }

  return (
    <DirectionsContext.Provider value={data}> 
        <div className={styles.body}>
      <div className={styles.head}>
        <h2>
            {
                lang === 'ENG'
                ?
                'Directions'
                :
                'Напрямки'
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
      <div className={styles.description}>
        <TextAreaCustom
        name={'description'}
        label={'Description:'}
        value={data.description} 
        handler={(name,value) => setData((prev) => {
          return {...prev,[name]:value}
        })}
        />
      </div>
      <div className={styles.items}>
        {
            data.items.map((item,index) => {
                return (
                        <DirectionItem 
                        updateData={updateData}
                        removeDirection={removeDirection} 
                        item={item} 
                        index={index}
                        key={index}/>
                )
            })
        }
        <div className={styles.addBtn}>
            <AddBtn
            handler={addDirection}
            />            
        </div>
      </div>
        </div>
    </DirectionsContext.Provider>
  )
}
