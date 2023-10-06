import styles from '../../styles/project-card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import loader from '../../../utils/loader'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {AiOutlineFolderOpen,AiFillEyeInvisible,AiFillEye, AiFillStar} from 'react-icons/ai'


export default function ProjectCard({edit,remove,setMainProject,project,hide}) {
  return (
    <div className={styles.body}>
        <div className={styles.logo}>
            <Image loader={() => loader(project.img)} src={project.img} width={'64'} height={'64'} alt={'project-logo'}/>
        </div>
        <div className={styles.info}>
            <div className={styles.title}>
                {project.title}
            </div>
            <div className={styles.description}>
                {project.description}
            </div>
            <div className={styles.details}>
                <div className={styles.closed}>
                    <span>Pool status: </span>
                    {
                    project.isClosed
                    ?
                    <div className={styles.closedLight}></div>
                    :
                    <div className={styles.activeLigth}></div>
                    }
                </div>
                <div className={styles.closed}>
                     <span>Hidden: </span>
                    {
                    project.hidden
                    ?
                    <div className={styles.closedLight}></div>
                    :
                    <div className={styles.activeLigth}></div>
                    }
                </div>
                <div className={styles.closed}>
                     <span>Is main: </span>
                    {
                    !project.isMainProject
                    ?
                    <div className={styles.closedLight}></div>
                    :
                    <div className={styles.activeLigth}></div>
                    }
                </div>
            </div>
        </div>
        <div className={styles.buttons}>
            <SquareBtn handler={() => edit(project._id)} width='50' text={<AiOutlineEdit/>}/>
            <SquareBtn 
            handler={(event) => remove(event,project._id)} 
            width='50' 
            text={<AiOutlineDelete id='toggle-modal'/>}/>
            {
                project.hidden
                ?
                <SquareBtn
                text={<AiFillEyeInvisible/>}
                width='50'
                handler={() => hide(project._id)}
                />
                :
                <SquareBtn
                text={<AiFillEye/>}
                width='50'
                handler={() => hide(project._id)}
                />
            }
            {
                project.isClosed
                ?
                <SquareBtn 
                width='50' 
                handler={() => setMainProject(project._id)} 
                text={<AiFillStar/>}/>
                :
                <SquareBtn 
                width='50' 
                handler={() => setMainProject(project._id)} 
                text={<AiFillStar/>}/>
            }
        </div>
    </div>
  )
}
