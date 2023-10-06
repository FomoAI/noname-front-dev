import { useState ,useCallback,useEffect} from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/create-slide.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn';
import Input from '../../UI/Input';
import CustomCalendar from '../../../assets/components/calendar/Calendar';
import FileInput from '../../UI/FileInput';
import Loader from '../../../assets/components/loader/Loader'
import useModal from '../../../hooks/useModal'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import createSlide from '../../services/bannerServices/createSlide';
import editSlide from '../../services/bannerServices/editSlide';

const inputs = [
    {
        label:'Title',
        name:'title',
        placeholder:'SharkRace Club'
    },
    {
        label:'Description',
        name:'description',
        placeholder:'Short Description'
    },
    {
        label:'Link',
        name:'link',
        placeholder:'https://example.com'
    },
    {
        label:'Time start',
        name:'timeStart',
        placeholder:'24:00'
    },
]

const CreateSlide = ({action,slide}) => {
    const router = useRouter()
    const {modalHandler,state} = useModal()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        title:'',
        description:'',
        date: new Date().toLocaleDateString(),
        link:'',
    })
    const [img,setImg] = useState(null)

    const inputsHandler = useCallback((name,value) => {
        return setData({...data,[name]:value})
    },[data])

    const fileHandler = (event) => {
        setImg(event.target.files[0])
    }

    const create = async () => {
        try{
            const slideData = new FormData()
            slideData.append('data',JSON.stringify(data))
            slideData.append('img',img)
            setLoading(true)
            const {success} = await createSlide(slideData)
            if(success){
                setData({
                    title:'',
                    description:'',
                    date: new Date().toLocaleDateString(),
                    link:'',
                })
                setImg(null)
                modalHandler(null,true)
            }else{
                alert('Something went wrong')
            }
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }

    const edit = async () => {
        try{
            const slideData = new FormData()
            slideData.append('data',JSON.stringify(data))
            slideData.append('img',img)
            setLoading(true)
            const {success} = await editSlide(slide._id,slideData)
            if(success){
                modalHandler(null,true)
            }else{
                alert('Something went wrong')
            }
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(slide){
            setData({
                title:slide.title,
                description:slide.description,
                link:slide.link,
                date:slide.date,
                timeStart:slide.timeStart
            })
        }
    },[])

    if(loading){
        <Loader/>
    }

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.title}>
                    <h1>{action} slide</h1>
                </div>
                <div className={styles.create}>
                    <SquareBtn handler={slide ? edit : create} type={'red'} text={action}/>
                </div>
            </div>
            <div className={styles.slide}>
                <div className={styles.inputsWrapper}>
                    <div className={styles.inputs}>
                        {inputs.map((input) => {
                            return(
                                <Input 
                                key={input.name}
                                value={data[input.name]}
                                handler={inputsHandler}
                                label={input.label}
                                name={input.name}
                                placeholder={input.placeholder}
                                />
                            )
                        })}
                    </div>
                    <div className={styles.customInputs}>
                            <div className={styles.customInput}>
                                <span className={styles.label}>Start date:</span>
                                <div className={styles.calendar}>
                                <CustomCalendar
                                stateHandler={inputsHandler} 
                                name={'date'} 
                                dates={data.date} 
                                range={false}/>
                                </div>
                            </div>
                            <div className={styles.customInput}>
                                <span className={styles.label}>Img (600x330):</span>
                                <FileInput
                                value={img}
                                handler={fileHandler}
                                name={'img'}
                                />
                            </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={state} handler={modalHandler}>
                <Success/>
                <div className={styles.successBtn}>
                    <SquareBtn
                    width='330' 
                    text={'Go to homepage'} 
                    handler={() => router.push('/admin')}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default CreateSlide;
