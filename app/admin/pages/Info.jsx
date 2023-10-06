import styles from '../styles/info.module.scss'
import CreateRoadmap from '../components/roadmap/CreateRoadmap'
import CreateGallery from '../components/gallery/CreateGallery'
import CreateAccordion from '../components/createAccordion/CreateAccordion'
import SquareBtn from '../../components/UI/buttons/SquareLightBtn'
import { useCallback, useState } from 'react'
import editInfo from '../services/infoServices/editInfo'
import fileFormParse from '../../utils/fileFormParse'
import Loader from '../../assets/components/loader/Loader'

export default function Info({data}) {
  const [loading,setLoading] = useState(false)
  const [info,setInfo] = useState(
    () => data ? data : {portfolio:[],partners:[],faq:[],risks:[],roadmap:[]}
  )
  const dataHandler = useCallback((name,value) => {
    setInfo({...info,[name]:value})
  },[info])

  const saveChanges = async () => {
    setLoading(true)
    const infoData = new FormData()
    fileFormParse(info.portfolio,'portfolio',infoData)
    fileFormParse(info.partners,'partners',infoData)
    infoData.append('data',JSON.stringify(info))
    const {success} = await editInfo(infoData)
    setLoading(false)
  }

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <h1 className={styles.title}>
          Info
        </h1>
        <div className={styles.saveBtn}>
          <SquareBtn handler={saveChanges} type='red' text={'Save'}/>
        </div>
      </div>
      <div className={styles.portfolio}>
        <CreateGallery handler={dataHandler} name={'portfolio'} items={info.portfolio} title={'Portfolio'}/>
      </div>
      <div className={styles.partners}>
        <CreateGallery handler={dataHandler} name={'partners'} items={info.partners} title={'Partners'}/>
      </div>
      <div>
        <CreateAccordion handler={dataHandler} name={'faq'} title={'FAQ'} items={info.faq}/>
      </div>
      <div>
        <CreateAccordion handler={dataHandler} name={'risks'} title={'Risks'} items={info.risks}/>
      </div>
      <div className={styles.roadmap}>
        <CreateRoadmap handler={dataHandler} name={'roadmap'} roadmapInitialState={info.roadmap}/>
      </div>
    </div>
  )
}
