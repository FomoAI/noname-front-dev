import { useState,useCallback,useEffect,useContext } from 'react'
import Image from 'next/image'
import { LangContext } from '../../pages/Academy'
import LoaderCustom from '../../../assets/components/loader/Loader'
import closeSvg from '../../../assets/icons/close.svg'
import Input from '../../UI/Input'
import SquareBtn from '../../../components/UI/buttons/SquareBlueBtn'
import AddBtn from '../../UI/AddBtn'
import getDataByLang from '../../../utils/getDataByLang'
import getCourses from '../../services/academyServices/courses/getCourses'
import updateCourses from '../../services/academyServices/courses/updateCourses'
import styles from '../../styles/courses.module.scss'

export default function AcademyCourses() {
  const [data,setData] = useState()

  const lang = useContext(LangContext)

  const addCourse = () => {
    setData((prev) => {
      return (
        [
          ...prev,
          {
            title:'',
            features:[
              '',
            ],
            price:0,
            status:''
          },
        ]
      )
    })
  }

  const removeCourse = (course) => {
    setData((prev) => {
      return (
        prev.filter((item,index) => {
          return course !== index
        })
      )
    })
  }

  const inputHandler = useCallback((courseIndex,name,value) => {
    setData((prev) => {
      return (
        prev.map((course,cIndex) => {
          if(cIndex === courseIndex){
            return {...course,[name]:value}
          }
          return course
        })
      )
    })  
  },[data])

  const inputItemHandler = useCallback((courseIndex,featureIndex,value) => {
    setData((prev) => {
      return (
        prev.map((course,cIndex) => {
          if(cIndex === courseIndex){
            return {
              ...course,
              features:course.features.map((fItem,fIndex) => {
                if(fIndex === featureIndex){
                  return value
                }
  
                return fItem
              })
            }
          }
          return course
        })
      )
    })  
  },[data])

  const addFeature = useCallback((courseIndex) => {
    setData((prev) => {
      return (
        prev.map((course,cIndex) => {
          if(cIndex === courseIndex){
            return {...course,features:[...course.features,'']}
          }
          return course
        })
      )
    })
  },[data])

  const removeFeature = useCallback((courseIndex,featureIndex) => {
    setData((prev) => {
      return (
        prev.map((course,cIndex) => {
          if(cIndex === courseIndex){
            return {...course,features:course.features.filter((f,fIndex) => fIndex !== featureIndex)}
          }

          return course
        })
      )
    })
  },[data])

  const confirmUpdate = async () => {
    try{
        const coursesData = {}
      
        coursesData[`items_${lang}`] = data

        const {success} = await updateCourses('6504554959fc89b9b2e9c7b6',coursesData,lang)

        window.location.reload()
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
      getCourses().then(({success,courses}) => {
          if(success){
              const coursesData = getDataByLang(courses,lang,'_')
              setData(coursesData.items)
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
                'Courses'
                :
                'Курси'
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

        <div className={styles.items}>
            {
              data.map((item,cIndex) => {
                return (
                  <div className={styles.item} key={cIndex}>
                    <button 
                    onClick={() => removeCourse(cIndex)}
                    className={styles.removeBtn}
                    >
                      Remove
                    </button>
                    <div className={styles.title}>
                      <Input
                      name={'title'}
                      handler={(name,value) => inputHandler(cIndex,name,value)}
                      label={'Title:'}
                      value={item.title}
                      />
                    </div>
                    <div className={styles.featureItem}>
                      Features:
                    </div>
                    <div className={styles.features}>
                      {
                        item.features.map((feature,fIndex) => {
                          return (
                            <div className={styles.featureWrapper} key={fIndex}>
                              <button
                              onClick={() => removeFeature(cIndex,fIndex)}
                              className={styles.removeFeature}
                              >
                                <Image src={closeSvg} alt={feature}/>
                              </button>
                              <Input
                              handler={(name,value) => inputItemHandler(cIndex,fIndex,value)}
                              label={`${fIndex + 1}.`}
                              value={feature}
                              />
                            </div>
                          )
                        })
                      }
                      <div className={styles.addItemBtn}>
                        <AddBtn
                        handler={() => addFeature(cIndex)}
                        />
                      </div>
                    </div>
                    <div className={styles.price}>
                        <Input
                        value={item.price}
                        name={'price'}
                        label={'Price:'}
                        type='number'
                        handler={(name,value) => inputHandler(cIndex,name,value)}
                        />
                    </div>
                    <div className={styles.btn}>
                      <Input
                      value={item.status}
                      name={'status'}
                      label={'Status:'}
                      handler={(name,value) => inputHandler(cIndex,name,value)}
                      />
                    </div>
                  </div>
                )
              })
            }  
            <div className={styles.addCourseBtn}>
              <AddBtn
              handler={addCourse}
              />
            </div>        
        </div>
    </div>
  )
}
