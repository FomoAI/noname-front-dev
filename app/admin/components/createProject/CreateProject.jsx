import { useState , useCallback, useEffect , useRef} from 'react'
import { useRouter } from 'next/router'
import { selectItems,socialItems,participantsItemsInitial,inputs,getInitialData } from './data'
import { changeComission } from '../../../smart/initialSmartMain'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Input from '../../UI/Input'
import Select from '../../UI/Select'
import FileInput from '../../UI/FileInput'
import RatingSelect from '../../UI/RatingSelect'
import CustomCheckbox from '../../../components/UI/inputs/CheckBox'
import ClaimModal from '../claimModal/ClaimModal'
import CustomCalender from '../../../assets/components/calendar/Calendar'
import TextEditor from '../textEditor/TextEditor'
import SocialMedia from '../socialMedia/SocialMedia'
import DocumentationLinks from '../documentationLinks/DocumentationLinks'
import Participants from '../participants/Participants'
import editProject from '../../services/editProject'
import fileFormParse from '../../../utils/fileFormParse'
import fetchProject from '../../../services/fetchProject'
import parseOldFiles from '../../../utils/parseOldFiles'
import Loader from '../../../assets/components/loader/Loader'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import CreateTags from '../createTags/CreateTags'
import CreateCompany from '../createCompany/CreateCompany'
import CreateAccordion from '../createAccordion/CreateAccordion'
import Media from '../media/Media'
import ProjectNews from '../projectNews/ProjectNews'
import useModal from '../../../hooks/useModal'
import getNews from '../../services/newsServices/getNews'

import { create } from './services/createProject'
import endProjectPool from './services/endProjectPool'

import styles from '../../styles/create.module.scss'

export default function CreateProject({type,status,id}) {
  const router = useRouter()
  const {modalHandler,state} = useModal()
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState(() => getInitialData(status,type))
  const [socialmedia,setSocialmedia] = useState([])
  const [participants,setParticipants] = useState(() => (
    {
      team:[],
      investors:[],
      partners:[],
    }
  ))
  const [news,setNews] = useState([])

  const [isEdit,setIsEdit] = useState(false)
  const [oldFiles,setOldFiles] = useState([])
  const [logo,setLogo] = useState(null)
  const [descriptionFile,setDescriptionFile] = useState(null)
  const [changedParticipants,setChangedParticipants] = useState({
    investors:false,
    team:false,
    partners:false
  })

  const [poolId,setPoolId] = useState(null)
  const [isReturn,setIsReturn] = useState(false)
  const [modalText,setModalText] = useState(``)
  const [isClaimModal,setIsClaimModal] = useState(false)

  const participantsTmp = useRef(participants)
  const linksTmp = useRef(participants)
  const tagsTmp = useRef(data.tags)
  const companyTmp = useRef(data.company)
  const mediaTmp = useRef(data.media)
  const oldComission = useRef()

  const changedParticipantsHandler = (name) => {
    setChangedParticipants((state) => ({...state,[name]:true}))
  }

  const inputsHandler = useCallback((name,value = '') => {
    setData({...data, [name] : value})
  },[data])

  const oldFilesHandler = (target) => {
    const isOldFile = oldFiles.find((item) => item.img === target)
    if(!isOldFile) return

    setOldFiles((state) => (
      state.map((file) => {
        if(file.img === target){
          return {...file,remove:true}
        }
        return file
      })
    ))
  }

  const filesHandler = useCallback((event,index,oldFile) => {
    oldFile && oldFilesHandler(oldFile)

    if(event.target.getAttribute('name') === 'logo'){
      setLogo(event.target.files[0])
    }else{
      setDescriptionFile(event.target.files[0])
    }

  },[logo,descriptionFile,data])

  const socialMediaHandler = useCallback((event,target) => {
    if(event.target.id === 'link'){
      setSocialmedia(socialmedia.map((item,index) => {
        if(index === target){
            return {...item,link : event.target.value}
        }
        return item
      }))
    }
    if(event.target.id.includes('checked')){
      setSocialmedia(socialmedia.map((item,index) => {
        if(index === target){
            return {...item,isSelect : !item.isSelect}
        }
        return item
      }))
    }
},[socialmedia])

  const participantHandler = useCallback((name,items) => {
    setParticipants({...participants,[name]:items})
  },[participants])

  const getNewsData = async () => {
    setLoading(true)
    const newsData = await getNews()
    setNews(newsData)
    setLoading(false)
  }

  const edit = async () => {
    const proejctData = new FormData()
    fileFormParse(participants.investors,'investor',proejctData)
    fileFormParse(participants.team,'team',proejctData)
    fileFormParse(participants.partners,'partner',proejctData)
    const teamItems = participants.team.length ? participants.team : data.team
    const investorsItems = participants.investors.length ? participants.investors : data.investors
    const partnersItems = participants.partners.length ? participants.partners : data.partners
    proejctData.append('data',JSON.stringify(
      {...data,socialmedia:socialmedia.filter((item) => item.isSelect),
      team:changedParticipants.team ? [] : teamItems,
      investors:changedParticipants.investors ? [] : investorsItems,
      partners:changedParticipants.partners ? [] : partnersItems,
      }))
    proejctData.append('logo',logo)
    proejctData.append('descriptionFile',descriptionFile)
    proejctData.append('oldFiles',JSON.stringify(oldFiles))
    setLoading(true)
    const {success} = await editProject(id,proejctData,type)
    if(Number(oldComission.current) !== Number(data.comission)){
      await changeComission(data.poolId,data.comission)
    }
    setLoading(false)
    if(success){
      router.reload()
    }else{
      alert('Uploading error')
    }
  }

  const confirmEndPool = async () => {
    try{
      if(!poolId) return

      const {success} = await endProjectPool(poolId,isReturn,id,type)
  
      if(success){
        modalHandler(null,true)
        setModalText('Pool ended!')
      }
    }catch(error){
      alert(error)
    }
  }

  const startClaimModalHandler = (event) => {
    setIsClaimModal(event.target.id !== 'toggle-modal')
  }

  useEffect(() => {
    const getProjectById = async (id) => {
      setLoading(true)
      const {success,project} = await fetchProject(id,type)
      if(success){
        const files = parseOldFiles(project)
        setOldFiles(files)
        setSocialmedia([
          ...project.socialmedia,
          ...socialItems.filter((item) => {
            return !project.socialmedia.find((pr) => pr.alt === item.alt)})
        ])
        participantsTmp.current = {
          team:project.team,
          partners:project.partners,
          investors:project.investors
        }
        linksTmp.current = project.links
        tagsTmp.current = project.tags
        companyTmp.current = project.company
        mediaTmp.current = project.media
        oldComission.current = project.comission 

        setPoolId(project.poolId)
        setData(project)
        setIsEdit(true)
        getNewsData()
        setLoading(false)

        return
      }else{
        alert(`Project ${id} not finded`)
        router.push('/admin')
      }
    }
    if(id){
      getProjectById(id)
    }else{
      setSocialmedia(socialItems)
      getNewsData()
    }
  },[id])

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <>
    <div className={styles.body}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h2>Create {type}</h2>
        </div>
          {
            isEdit
            ?
            <div className={styles.editBtns}>
              <SquareBtn handler={edit} type='red' width={'200'} text={'Save'}/>
              <SquareBtn 
              disabled={data?.isClosed}
              handler={confirmEndPool} type='red' width={'200'} text={'End pool'}/>
              <div className={styles.endCheckBox}>
                <div className={styles.subTitle}>
                  Is this a refund?
                </div>
                <CustomCheckbox
                handler={() => setIsReturn((prev) => !prev)}
                isChecked={isReturn}
                />
              </div>
              <SquareBtn
              disabled={!data?.isClosed}
              text={'Start claim'}
              width='200'
              type='red'
              handler={() => setIsClaimModal(true)}
              />
            </div>
            :
            <div className={styles.createBtn}>
              <SquareBtn handler={() => {
                create(
                  setLoading,
                  modalHandler,
                  data,
                  participants,
                  socialmedia,
                  type,
                  logo,
                  descriptionFile
                )
              }} type='red' width={'200'} text={'Create'}/>
            </div>
          }
      </div>

      <div className={styles.inputsBlock}>

      <div className={styles.inputs}>
        {inputs.map((input,index) => {
          return(
            <div key={input.name} className={styles.input}>
            <Input 
            type={input.type || 'string'}
            label={input.label} 
            name={input.name} 
            handler={inputsHandler} 
            value={data[input.name]} 
            placeholder={input.placeholder}/>
            </div>
          )
        })}
        <Media
        value={mediaTmp.current}
        handler={inputsHandler}
        name={'media'}
        />
      </div>

      <hr className={styles.line}/>

      <div className={styles.customInputs}>
          <div className={styles.select}>
            <div className={styles.subTitle}>
                Status:
            </div>
            <Select items={selectItems} name={'status'} value={status} handler={inputsHandler}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
              Staking start - Staking end:
            </div>
            <CustomCalender stateHandler={inputsHandler} name={'dates'} dates={data.dates}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
              Purchase start - Purchase end:
            </div>
            <CustomCalender stateHandler={inputsHandler} name={'purchaseDates'} dates={data.purchaseDates}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
              Distribution start:
            </div>
            <CustomCalender
            range={false} 
            stateHandler={inputsHandler} 
            name={'distributionStart'} 
            dates={data.distributionStart}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
            Green date start:
            </div>
            <CustomCalender
            range={false} 
            stateHandler={inputsHandler} 
            name={'greenTime'} 
            dates={data.greenTime}/>
          </div>

          <div className={styles.calendar}>
            <div className={styles.subTitle}>
              Yellow date start:
            </div>
            <CustomCalender
            range={false} 
            stateHandler={inputsHandler} 
            name={'yellowTime'} 
            dates={data.yellowTime}/>
          </div>

          <div className={styles.file}>
            <div className={styles.subTitle}>
              <span>Logo (jpg/png/svg, 64x64)</span>:
            </div>
            <FileInput oldValue={data?.img} value={logo} handler={filesHandler} label={'logo'}/>
          </div>

          <div className={styles.file}>
            <div className={styles.subTitle}>
              <span>Description img/video, 600x330</span>:
            </div>
            <FileInput 
            oldValue={data?.projectImg}
            accept={'image/*, video/mp4, video/x-m4v, video/*'} 
            name={'description'} 
            value={descriptionFile} 
            handler={filesHandler} 
            label={'Description file'}/>
          </div>

          <div className={styles.rating}>
            <div className={styles.subTitle}>
              <span>Rating: </span>
            </div>
            <RatingSelect handler={inputsHandler} name={'rating'}/>
          </div>
      </div>

      <div className={styles.tags}>
            <div >
              <h2>Tags</h2>
            </div>
            <CreateTags value={tagsTmp.current} handler={inputsHandler} name={'tags'}/>
      </div>

      <div className={styles.socialMedia}>
          <div className={styles.socialTitle}>
            <h2>Social media</h2>
          </div>
          <SocialMedia 
          projectSocialMedia={socialmedia} 
          name={'socialmedia'} 
          handler={socialMediaHandler}/>
      </div>

      <div className={styles.company}>
        <div>
          <h2>About company</h2>
        </div>
        <CreateCompany
        value={companyTmp.current}
        handler={inputsHandler}
        name={'company'}
        />
      </div>

      <div className={styles.links}>
        <div className={styles.linksTitle}>
          <h2>Documentation links</h2>
        </div>
        <DocumentationLinks 
        projectLinks={linksTmp.current} 
        name={'links'} 
        handler={inputsHandler}
        />
      </div>

      <div className={styles.participants}>
        {participantsItemsInitial.map((item) => {
          return(
          <div key={item.title} className={styles.participant}>
            <div className={styles.title}><h2>{item.title}</h2></div>
            <Participants 
            changedParticipantsHandler={changedParticipantsHandler}
            oldFilesHandler={oldFilesHandler}
            setParticipants={setParticipants}
            participantsItems={participantsTmp.current[item.name]}
            participantName={item.name} 
            handler={participantHandler} 
            title={item.title}/>
          </div>
          )
        })}
      </div>

      <hr className={styles.line}/>

      <div className={styles.description}>
        <div className={styles.descriptionTitle}><h2>Description</h2></div>
        <TextEditor value={data.descriptionFull} name={'descriptionFull'} handler={inputsHandler}/>
      </div>

      <div className={styles.accordions}>
        <div className={styles.accordion}>
          <CreateAccordion
          name={'faq'}
          title={'FAQ'}
          items={data.faq}
          handler={inputsHandler}
          />
        </div>

        <div className={styles.accordion}>
          <CreateAccordion
          name={'risks'}
          title={'Risks'}
          items={data.risks}
          handler={inputsHandler}
          />
        </div>
      </div>

      <div className={styles.news}>
        <ProjectNews
        handler={inputsHandler}
        projectNews={data.news}
        news={news}
        />
      </div>

      </div>
    </div>
    <Modal handler={modalHandler} isVisible={state}>
      <Success
      text={modalText}
      />
      <div className={styles.successBtn}>
        <SquareBtn 
        width='340'
        text={'Go to home page'} 
        handler={() => router.push('/admin')}/>
      </div>
    </Modal>
    <ClaimModal
    project={data}
    isVisible={isClaimModal}
    handler={startClaimModalHandler}
    />
   </>
  )
}
