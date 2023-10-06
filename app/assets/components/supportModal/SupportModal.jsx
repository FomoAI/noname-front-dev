import { useCallback, useState } from 'react'
import Image from 'next/image'
import Modal from '../modal/Modal'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Loader from '../loader/Loader'
import Success from '../success/Success'
import useProjects from '../../../hooks/useProjects'
import SearchProject from '../searchProject/SearchProject'
import arrowRotate from '../../icons/arrow-rotate.svg'
import loader from '../../../utils/loader'
import form from '../../../services/form'
import styles from './support.module.scss'
import ProjectsList from '../projectsList/ProjectsList'

export default function SupportModal({isVisible,handler,success,setSuccess,user}) {
    const [projectList,setProjectList] = useState(false)
    const [supportData,setSupportData] = useState({})
    const [loading,setLoading] = useState(false)
    const {allProjects} = useProjects({})

    const inputsHandler = useCallback((event,target) => {
        setSupportData({...supportData,[target]:event.target.value})
    },[supportData])

    const selectProject = useCallback((project) => {
        setProjectList(false)
        setSupportData((state) => ({...state,project:project}))
    },[supportData,projectList,allProjects])

    const fileHandler = (event) => {
        event.preventDefault()
        if (event.target.files[0]) {
            setSupportData({...supportData,file:event.target.files[0]});
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('theme', supportData.theme);
        formData.append('project', `title: ${supportData.project.title}, description: ${supportData.project.description}`
        );
        formData.append('message', supportData.message);
        formData.append('customFile', supportData.file);
        formData.append('user',user.address)

        const {success} = await form(formData,'support')
        success && setSupportData({})
        success && setSuccess(true)
    }

    if(loading){
        return (
            <Loader/>
        )
    }
   
  return (
    <Modal
    bodyClass="top-modal"
    title='Support'
    handler={handler}
    isVisible={isVisible}
    >
        {
            success
            ?
            <Success/>
            :
            <div className={styles.body}>
                <div className={styles.description}>
                Do not hesitate to ask if you have any questions
                </div>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <span className={styles.key}>
                        Theme
                        </span>
                        <BlueInput
                        id={'theme'}
                        handler={inputsHandler}
                        value={supportData.theme}
                        />
                    </div>
                    <div className={styles.projectList}>
                        <span className={styles.key}>
                            Project
                        </span>
                        <div className={styles.projectBlock}>
                            <button 
                            onClick={() => setProjectList((state) => !state)} 
                            className={styles.selectProject}>
                                <Image src={arrowRotate} alt='arrow-rotate'/>
                            </button>
                            <div className={styles.selectedProject}>
                                {
                                    supportData.project
                                    ?
                                    <div 
                                    onClick={() => setProjectList((state) => !state)}
                                    className={styles.selectProjectBody}>
                                        <Image 
                                        loader={() => loader(supportData.project.img)} 
                                        width={'24'} height={'24'} 
                                        src={supportData.project.img} alt={supportData.project.title}
                                        />
                                        <div className={styles.projectTitle}>
                                            {supportData.project.title}
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                            </div>
                        </div>
                        <div className={styles.projectItems}>
                            {
                                projectList
                                ?
                                <ProjectsList 
                                withLink={false}
                                handler={selectProject}
                                projects={allProjects}/>
                                :
                                <></>
                            }
                        </div>

                    </div>
                    <div className={styles.message}>
                        <span className={styles.key}>Your message</span>
                        <textarea 
                        onChange={(event) => inputsHandler(event,'message')}
                        name="" id="" cols="30" rows="10">
                        </textarea>
                    </div>
                    <div className={styles.fileInput}>
                        <span className={styles.fileDescription}>
                        Сonsectetur adipiscing elit, 
                        sed do eiusmod tempor
                        </span>
                        <div className={styles.fakeInput}>
                            <label 
                            htmlFor='file-input' 
                            className={styles.fake}>
                                {supportData.file ? supportData.file.name : '+ Add file'}
                            </label>
                            <input 
                            accept="image/png,application/msword,.doc,image/jpeg, application/pdf" 
                            onChange={fileHandler} 
                            type="file" 
                            id={'file-input'} />
                        </div>
                    </div>
                </div>
                <SquareBtn
                btnId='none'
                handler={submitForm}
                width='360'
                type='red'
                text={'Send'}
                />
            </div>
        }
    </Modal>
  )
}
