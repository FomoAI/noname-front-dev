import Input from '../../UI/Input'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import { useState } from 'react'
import changeHeader from '../../services/headerServices/changeHeader'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import useModal from '../../../hooks/useModal'
import Loader from '../../../assets/components/loader/Loader'
import Calendar from '../../../assets/components/calendar/Calendar'
import CheckBox from '../../../components/UI/inputs/CheckBox'
import styles from '../../styles/header-settings.module.scss'

const HeaderSettings = ({headerData}) => {
    const [loading,setLoading] = useState(false)
    const {modalHandler,state} = useModal()
    const [data,setData] = useState(headerData[0])

    const inputsHandler = (name,value) => {
        setData({...data,[name]:value})
    }

    const save = async () => {
        try{
            setLoading(true)
            const {success} = await changeHeader(data)
            if(success){
                modalHandler(null,true)
            }
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }

    if(loading){
        <Loader/>
    }

    return (
        <>
        <div className={styles.body}>
            <div className={styles.title}>
                <h1>Header</h1>
            </div>
            <div className={styles.inputs}>
                <Input 
                name={'name'}
                handler={inputsHandler}
                value={data.name}
                label={'Name:'} 
                placeholder={'View on OpenSea'}
                />
                <Input 
                name={'link'}
                handler={inputsHandler}
                value={data.link}
                label={'Ref:'} 
                placeholder={'https://example.com'}
                />
            </div>
            <div className={styles.banner}>
                <div className={styles.title}>
                    <h2>Banner</h2>
                </div>
                <div className={styles.inputs}>
                <Input 
                name={'message'}
                handler={inputsHandler}
                value={data.message}
                label={'Message:'} 
                placeholder={'Deals closing soon!'}
                />
                <div className={styles.timerSettings}>
                    <div className={styles.calendar}>
                        <span>Date:</span>
                        <Calendar
                        stateHandler={inputsHandler}
                        name={'date'} 
                        dates={data.date ? data.date : String(new Date().toDateString())} 
                        range={false}/>
                    </div>
                    <Input 
                    name={'time'}
                    handler={inputsHandler}
                    value={data.time}
                    label={'Time:'} 
                    placeholder={'24:00'}
                    />
                </div>
                <Input 
                name={'linkName'}
                handler={inputsHandler}
                value={data.linkName}
                label={'Link name:'} 
                placeholder={'View closing soon'}
                />
                <Input 
                name={'href'}
                handler={inputsHandler}
                value={data.href}
                label={'Ref:'} 
                placeholder={'https://example.com'}
                />

                <div className={styles.isVisibleCheckbox}>
                    <div className={styles.isVisibleLabel}>
                        Banner visible:
                    </div>
                    <CheckBox
                    isChecked={data.bannerVisible}
                    handler={() => inputsHandler('bannerVisible',!data.bannerVisible)}
                    />
                </div>
         
                </div>
            </div>
            <div className={styles.save}>
                <SquareBtn 
                handler={save}
                text={'Save'} 
                width={'450'}/>
            </div>
        </div>
        <Modal handler={modalHandler} isVisible={state}>
            <Success/>
            <div className={styles.successBtn}>
              <SquareBtn 
              width='340'
              text={'Go to home page'} 
              handler={() => router.push('/admin')}/>
            </div>
        </Modal>
        </>
    );
}

export default HeaderSettings;
