import { useMemo, useState } from 'react'
import useProjects from '../../../hooks/useProjects'
import ProjectsList from '../projectsList/ProjectsList'
import Image from 'next/image'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Input from '../../UI/Input'
import AddBtn from '../../UI/AddBtn'
import arrowSvg from '../../../assets/icons/arrow-rotate.svg'
import styles from '../../styles/collections.module.scss'
import loader from '../../../utils/loader'

const inputsInitialState = [
    {
        label:'Collection title',
        name:'title',
        placeholder:'Noname key',
        type:'text',
    },
    {
        label:'Metadata API',
        name:'metadataLink',
        placeholder:'https://example.com/metadata',
        type:'text',
    },
    {
        label:'NFT Quantity',
        name:'quantity',
        placeholder:'2222',
        type:'number',
    },
    {
        label:'Smart contract',
        name:'smart',
        placeholder:'0x0bB8f9686368A12eD34332E50A7b3bE0e25e3a14',
        type:'text',
    },
]

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

export default function CreateCollection({addCollection}) {
    const [isTypeSelect,setIsTypeSelect] = useState(false)
    const [isProjectSelect,setIsProjectSelect] = useState(false)
    const [selectedType,setSelectedType] = useState('Select type')
    const [selectedProject,setSelectedProject] = useState('Select project')
    const [isNewCollecton,setIsNewCollection] = useState(false)
    const {allProjects} = useProjects({})
    const [newCollectionData,setNewCollectionData] = useState({
        title:'',
        metadataLink:'',
        smart:'',
        quantity:0,
    })

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
        setNewCollectionData({...newCollectionData,[name]:value})
    }

    const confirmCreateCollection = () => {
        if(!newCollectionData.metadataLink || !newCollectionData.quantity || !newCollectionData.title){
            alert('Title, Metadata API and NFT Quantity must filled')
            return
        }
        if(typeof selectedProject === 'string' || selectedType === 'Select type'){
            alert('Please, select project and collection type')
            return
        }

        addCollection({
            ...newCollectionData,
            type:selectedType,
            project:selectedProject,
        })

        setIsProjectSelect(false)
    }

    const filteredProjects = useMemo(() => {
        if(!searchValue){
            return allProjects
        }
        return allProjects.filter((project) => {
            return project.title.toLowerCase().includes(searchValue.toLowerCase())
        })

    },[searchValue,allProjects])
    
  return (
    <div className={styles.body}>
        {
            isNewCollecton
            ?
            <div className={styles.create}>
                <div className={styles.inputs}>
                    {
                        inputsInitialState.map((input,index) => {
                            return (
                                <Input
                                key={index}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={newCollectionData[input.name]}
                                handler={inputHandler}
                                label={input.label}
                                name={input.name}
                                />
                            )
                        })
                    }
                </div>
                <div className={styles.lists}>
                  <div className={styles.typeSelect}>
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
                            <div className={styles.types}>
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
                <div className={styles.btns}>
                    <SquareBtn
                    text={'Cancel'}
                    handler={() => setIsNewCollection(false)}
                    />
                    <SquareBtn
                    type='red'
                    text={'Create'}
                    handler={confirmCreateCollection}
                    />
                </div>
            </div>
            :
            <AddBtn 
            handler={() => setIsNewCollection(true)}
            />
        }
    </div>
  )
}
