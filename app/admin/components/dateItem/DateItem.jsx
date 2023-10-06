import { useMemo } from 'react';
import styles from '../../styles/date-item.module.scss'
import CustomCalendar from '../../../assets/components/calendar/Calendar';
import loader from '../../../utils/loader'
import Image from 'next/image'
import successSvg from '../../../assets/icons/complete.svg'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn';

const DateItem = ({index,save,remove,projects,dateItem,datesHandler,projectsHandler}) => {

    const selectedProjects = useMemo(() => {
        return projects.map((project) => {
            if(dateItem.projects.includes(project._id)){
                return {...project,selected:true}
            }
            return {...project,selected:false}
        })
    },[dateItem,projects])

    return (
        <>
        <div className={styles.body}>
            <div className={styles.index}>
                {dateItem.localid}
            </div>
            <div className={styles.date}>
                <div className={styles.head}>
                    <div>
                        <div className={styles.label}>
                            Date:
                        </div>
                        <div className={styles.calendar}>
                            <CustomCalendar 
                            id={dateItem.localid}
                            name={'date'}
                            stateHandler={datesHandler} 
                            dates={dateItem.date}
                            range={false}
                            />
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.save}>
                            <SquareBtn 
                            handler={() => save(dateItem?._id,dateItem)} 
                            text={'Save'} 
                            type={'red'}/>
                        </div>
                        <div className={styles.remove}>
                            <SquareBtn 
                            handler={() => remove(dateItem?._id,dateItem.localid)} 
                            text={'Remove'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.projectsWrapper}>
                <div className={styles.label}>
                    Project & Donates:
                </div>
                <div className={styles.projects}>
                 {selectedProjects.map((item) => {
                     return (
                         <div 
                         key={item._id}
                         onClick={() => projectsHandler(dateItem.localid,item._id)} 
                         className={styles.project} 
                         >
                             <div className={styles.img}>
                                 <Image 
                                 width={'84'}
                                 height={'84'}
                                 alt='project-img'
                                 loader={() => loader(item.img)} 
                                 src={item.img}/>
                             </div>
                             <div className={styles.info}>
                                 <div className={styles.prTitle}>
                                     {item.title}
                                 </div>
                                 <div className={styles.infoRow}>
                                    <span className={styles.key}>Type: </span>
                                    <span className={styles.value}>{item.path}</span>
                                 </div>
                                 <div className={styles.infoRow}>
                                    <span className={styles.key}>Status: </span>
                                    <span className={styles.value}>{item.status}</span>
                                 </div>
                             </div>
                             {
                                item?.selected
                                ?
                                <div className={styles.selected}>
                                    <Image 
                                    width={'52'}
                                    height={'52'}
                                    src={successSvg} 
                                    alt={'selected-project'}/>
                                </div>
                                :
                                <></>
                             }
                         </div>
                     )
                 })}
                </div>
            </div>
          
        </div>

        </>
    );
}

export default DateItem;
