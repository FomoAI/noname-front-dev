import { useCallback, useState , useEffect} from 'react'
import styles from '../../styles/create-roadmap.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Input from '../../UI/Input'
import Select from '../../UI/Select'

const selectItems = [
    'done',
    'inwork',
    'upcoming'
]

const checkStatus = (status) => {
    if(status === 'done'){
        return (
            <div className={styles.done}></div>
        )
    }
    if(status === 'inwork'){
        return (
        <div className={styles.inworkWrapper}>
            <div className={styles.inwork}></div>
        </div>
        )
    }
    if(status === 'upcoming'){
        return (
            <div className={styles.upcoming}></div>
        )
    }
}

export default function CreateRoadmap({roadmapInitialState,name,handler}) {
    const [roadmap,setRoadmap] = useState(() => roadmapInitialState)

    const addItem = (stageIndex) => {
        setRoadmap((state) => state.map((stage,index) => {
            if(index === stageIndex){
                return {...stage,items:[...stage.items,{text:'',status:'upcoming'}]}
            }
            return stage
        }))
    }

    const removeItem = (stageIndex,id) => {
        setRoadmap((state) => state.map((stage,index) => {
            if(index === stageIndex){
                return {...stage,items:stage.items.filter((item,index) => index !== id)}
            }
            return stage
        }))
    }

    const changeStatus = useCallback((stageIndex,value,target) => {
        setRoadmap((state) => state.map((stage,index) => {
            if(index === stageIndex){
                return (
                    {
                        ...stage,
                        items:stage.items.map((item,i) => {
                            if(i === target){
                                return {...item,status:value}
                            }
                            return item
                        })
                    }
                )
            }

            return stage
        }))
    },[roadmap])

    const inputHandler = useCallback((stageIndex,value,target) => {
        setRoadmap((state) => state.map((stage,index) => {
            if(index === stageIndex){
                return (
                    {
                        ...stage,
                        items:stage.items.map((item,i) => {
                            if(i === target){
                                return {...item,text:value}
                            }
                            return item
                        })
                    }
                )
            }

            return stage
        }))
    },[roadmap])
    
    useEffect(() => {
        handler(name,roadmap)
    },[roadmap])

  return (
    <div className={styles.body}>
        <div className={styles.title}>
            <h4>Roadmap</h4>
        </div>
        <div className={styles.stages}>
            {
                roadmap.map((stage,stageIndex) => {
                    return (
                        <div key={stage.stage} className={styles.list}>
                            <div className={styles.subTitle}>
                                {stage.stage}
                            </div>
                            <ul>
                                {
                                    stage.items.map((item,index) => {
                                        return (
                                            <li key={index} className={styles.item}>
                                                {checkStatus(item.status)}
                                                <div className={styles.select}>
                                                    <Select 
                                                    handler={changeStatus}
                                                    id={index}
                                                    custom={true}
                                                    value={item.status}
                                                    name={stageIndex}
                                                    items={selectItems}
                                                    />
                                                </div>
                                                <div className={styles.itemBody}>
                                                    <Input
                                                    placeholder='Roadmap...'
                                                    handler={inputHandler}
                                                    name={stageIndex}
                                                    index={index}
                                                    value={item.text}
                                                    />
                                                    <button onClick={() => removeItem(stageIndex,index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <div className={styles.addBtn}>
                                <SquareBtn 
                                width='240'
                                text={'+'}
                                handler={() => addItem(stageIndex)}
                                />
                                </div>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
