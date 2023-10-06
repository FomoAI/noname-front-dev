import { useState , useMemo } from 'react'
import Image from 'next/image'
import loader from '../../../utils/loader'
import NftsList from '../nftsList/NftsList'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import sliceAddress from '../../../utils/sliceAddress'
import pinSvg from '../../../assets/icons/pin.svg'
import ProjectsList from '../projectsList/ProjectsList'
import arrowSvg from '../../../assets/icons/arrow-rotate.svg'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import styles from "../../styles/collection.module.scss";
import Input from '../../UI/Input'

const types = [
    {
        label:'Noname Key',
        value:'nonamekey',
    },
    {
        label:'Crypto',
        value:'crypto'
    },
    {
        label:'Business',
        value:'business'
    },
    {
        label:'zKsync',
        value:'zksync'
    },
]

export default function Collection(
    {
        collection,
        pinHandler,
        removeCollection,
        editCollection,
        projects
    }) {
        
    const [isEdit,setIsEdit] = useState(false)
    const [collectionData,setCollectionData] = useState(collection)

    const [isTypeSelect,setIsTypeSelect] = useState(false)
    const [isProjectSelect,setIsProjectSelect] = useState(false)
    const [selectedType,setSelectedType] = useState(collectionData.type)
    const [selectedProject,setSelectedProject] = useState(collectionData.project)
    const [searchValue,setSearchValue] = useState('')
    
    const typeSelectHandler = () => {
        setIsTypeSelect((prev) => !prev)
        setIsProjectSelect(false)
    }

    const projectSelectHandler = () => {
        setIsProjectSelect((prev) => !prev)
        setIsTypeSelect(false)
    }

    const inputHandler = (name,value) => {
        setCollectionData({...collectionData,[name]:value})
    }

    const confrimEditCollection = async () => {
        const collectionToEdit = {
            title:collectionData.title,
            smart:collectionData.smart,
            type:selectedType,
            project:selectedProject,
        }   
      
        setIsEdit(false)

        await editCollection(collection._id,collectionToEdit,selectedProject._id || collection.project._id)
    }

    const filteredProjects = useMemo(() => {
        if(!searchValue){
            return projects
        }
        return projects.filter((project) => {
            return project.title.toLowerCase().includes(searchValue.toLowerCase())
        })

    },[searchValue,projects])
    
  return (
    isEdit
    ?
    <div className={styles.collection + ' ' + styles.edit}>
      <div className={styles.editActions}>
        <div className={styles.cancelBtn}>
          <SquareBtn
            width='120'
            handler={() => setIsEdit(false)}
            text={'Cancel'}
          />
        </div>
        <div className={styles.confirmBtn}>
          <SquareBtn
            width='120'
            type='red'
            handler={confrimEditCollection}
            text={'Confrim'}
          />
        </div>
      </div>
      <div className={styles.title}>Edit collection</div>
      <div className={styles.collectionInfo}>
        <div className={styles.infoRow + ' ' + styles.editRow}>
          <div className={styles.collectionDetails + ' ' + styles.editDetails}>
            <div className={styles.infoItem + ' ' + styles.editItem}>
              <Input
              handler={inputHandler}
              value={collectionData.title}
              name={'title'}
              label={'Title:'}
              />
            </div>
            <div className={styles.typeSelect + ' ' + styles.editItem}>
                    <div className={styles.label}>
                        Type:
                    </div>
                    <div className={styles.selectWrapper}>
                        <button
                        className={styles.selectBtn}
                        onClick={typeSelectHandler}
                        >
                            {selectedType}
                            {
                                isTypeSelect
                                ?
                                <Image className={styles.rotate} src={arrowSvg} alt='arrow'/>
                                :
                                <Image src={arrowSvg} alt='arrow'/>
                            }
                        </button>
                        {
                            isTypeSelect
                            ?
                            <div className={styles.types }>
                            {
                                types.map((type,index) => {
                                    return(
                                        <button
                                        key={index}
                                        onClick={() => {
                                            setIsTypeSelect(false)
                                            setSelectedType(type.value)
                                        }}
                                        >
                                            {type.label}
                                        </button>
                                    )
                                })
                            }
                            </div>
                            :
                            <></>
                        }
                    </div>
                  </div>
            <div className={styles.infoItem + ' ' + styles.editItem}>
                <Input
                handler={inputHandler}
                value={collectionData.smart}
                name={'smart'}
                label={'Smart contract:'}
                />
            </div>
          </div>
          <div className={styles.projectsWrapper}>
                        <div className={styles.label}>
                            Project:
                        </div>
                        <button
                        onClick={projectSelectHandler}
                        className={styles.selectedProject}>
                            {
                                typeof selectedProject === 'string'
                                ?
                                <div className={styles.initialSelectProjectState}>
                                    {selectedProject}
                                    <Image src={arrowSvg} alt='arrow'/>
                                </div>
                                :
                                <div className={styles.initialSelectProjectState}>
                                    <div className={styles.selectedProjectBody}>
                                    <img 
                                    src={loader(selectedProject.img)} 
                                    alt='project img'/>
                                    {selectedProject.title}
                                    </div>
                                    {
                                        isProjectSelect
                                        ?
                                        <Image
                                        className={styles.rotate} 
                                        src={arrowSvg} 
                                        alt='arrow'/>
                                        :
                                        <Image src={arrowSvg} alt='arrow'/>
                                    }
                                </div>
                            }
                        </button>
                        {
                            isProjectSelect
                            ?
                            <div className={styles.projectsList}>
                            <input
                            className={styles.projectSearch}
                            placeholder='Project name...'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <ProjectsList 
                            handler={(project) => {
                                setSelectedProject(project)
                                setIsProjectSelect(false)
                            }}
                            projects={filteredProjects}/>
                            </div>
                            :
                            <></>
                        }
          </div>
        </div>
      </div>
    </div>
    :
    <div className={styles.collection}>
      <button onClick={() => pinHandler(collection)} className={styles.pinBtn}>
        {collection.isPinned ? (
          <Image src={pinSvg} alt="pin" />
        ) : (
          <Image className={styles.notPin} src={pinSvg} alt="pin" />
        )}
      </button>
      <div className={styles.deleteBtn}>
        <SquareBtn
            width='60'
          handler={() => removeCollection(collection)}
          text={<AiOutlineDelete/>}
        />
      </div>
      <div className={styles.editBtn}>
        <SquareBtn
            width='60'
          handler={() => setIsEdit(true)}
          text={<AiOutlineEdit/>}
        />
      </div>
      <div className={styles.collectionInfo}>
        <div className={styles.infoRow}>
          <div className={styles.collectionDetails}>
            <div className={styles.infoItem}>
              <span className={styles.key}>Title:</span>
              <span className={styles.value}>{collection.title}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.key}>Type:</span>
              <span className={styles.value}>{collection.type}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.key}>Smart contract:</span>
              <span className={styles.value}>
                {sliceAddress(collection.smart)}
              </span>
            </div>
          </div>
          <div className={styles.projectDetails}>
            <div className={styles.key}>Project:</div>
            <div className={styles.projectInfo}>
              <img src={loader(collection.project.img)} alt="project img" />
              <div className={styles.projectInfoRow}>
                <div className={styles.projectTitle}>
                  {collection.project.title}
                </div>
                <div className={styles.projectType}>
                  {collection.project.type}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.collectionsNfts}>
          <div className={styles.title}>Nfts ({collection.quantity}):</div>
          <NftsList nfts={collection.nfts} />
        </div>
      </div>
    </div>
  );
}
