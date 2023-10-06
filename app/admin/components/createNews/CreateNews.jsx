import { useState ,useEffect, useMemo} from 'react'
import styles from '../../styles/create-news.module.scss'
import Input from '../../UI/Input'
import CustomCalender from '../../../assets/components/calendar/Calendar'
import FileInput from '../../UI/FileInput'
import TextEditor from '../textEditor/TextEditor'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Loader from '../../../assets/components/loader/Loader'
import AddBtn from '../../UI/AddBtn'
import Recommendations from '../recommendations/Recommendations'
import RecModal from '../RecommendationsModal/RecModal'
import useModal from '../../../hooks/useModal'
import createNews from '../../services/newsServices/createNews'
import getNews from '../../services/newsServices/getNews'
import editNews from '../../services/newsServices/editNews'
import Modal from '../../../assets/components/modal/Modal'
import Success from '../../../assets/components/success/Success'
import blockScroll from '../../../utils/blockScroll'
import { useRouter } from 'next/router'

export default function CreateNews({action = 'Create',id}) {
    const router = useRouter()
    const [success,setSuccess] = useState(false)
    const [allNews,setAllNews] = useState([])
    const {modalHandler,state} = useModal()
    const [loading,setLoading] = useState(false)
    const [recommendations,setRecommendations] = useState([])
    const [data,setData] = useState({
        title:'',description:'',date: new Date().toLocaleDateString()
    })
    const [img,setImg] = useState(null)

    const successModalHandler = (event) => {
        if(event.target.id === 'toggle-modal'){
            blockScroll()
            setSuccess((state) => !state)
        }
    }

    const inputsHandler = (name,value) => {
        setData({...data,[name]:value})
    }

    const fileHandler = (event) => {
        setImg(event.target.files[0])
    }

    const resetData = () => {
        setData({
            title:'',description:'',date: new Date().toLocaleDateString()
        })
        setImg(null)
        setRecommendations([])
    }

    const create = async () => {
        try{
            const newsData = new FormData()
            newsData.append('data',JSON.stringify({...data,recommendations}))
            newsData.append('img',img)
            setLoading(true)
            const {success} = await createNews(newsData)
            setLoading(false)
            if(success){
                resetData()
                setSuccess(true)
                blockScroll()
            }else{
                alert('Something went wrong..')
            }

        }catch(error){
            console.log(error);
        }
    }

    const edit = async () => {
        try{
            const newsData = new FormData()
            newsData.append('data',JSON.stringify({...data,recommendations}))
            newsData.append('img',img)
            setLoading(true)
            const {success} = await editNews(id,newsData)
            setLoading(false)
            if(success){
                resetData()
                setSuccess(true)
                blockScroll()
            }else{
                alert('Something went wrong..')
            }
        }catch(error){

        }
    }

    const recommendationsToggle = (id) => {
        const isNew = !!recommendations.includes(id)
        if(!isNew){
            setRecommendations((state) => [...state,id])
            setAllNews((state) => state.map((item) => {
                if(item._id === id){
                    return {...item,selected:true}
                }
                return item
            }))
        }else{
            setRecommendations((state) => 
            state.filter((item) => item !== id))
            setAllNews((state) => state.map((item) => {
                if(item._id === id){
                    return {...item,selected:false}
                }
                return item
            }))
        }
    }

    useEffect(() => {
        const getNewsData = async () => {
            try{
                const {success,news} = await getNews(id)

                if(!success){
                    throw new Error('Cannot get news')
                }

                setRecommendations(news.recommendations.map((item) => {
                    if(item){
                        return item._id
                    }
                }).filter((item) => item))
                setData({
                    title:news.title,
                    description:news.description,
                    date:news.date
                })
            }catch(error){
                console.log(error);
                return {success:false}
            }
        }
        if(id){
            getNewsData()
        }
        const getAllNews = async () => {
            setLoading(true)
            const {success,news} = await getNews()
            if(success){
                setAllNews(news.map((item) => {
                    if(recommendations.length && recommendations.includes(item._id)){
                        return {...item,selected:true}
                    }
                    return {...item,selected:false}
                }))
            }
            setLoading(false)
        }
        getAllNews()
    },[])

    const filteredNews = useMemo(() => {
        if(allNews.length){
            return allNews.filter((item) => {
                return recommendations.includes(item._id) 
            })
        }
    },[recommendations,allNews])

    if(loading){
        return(
            <Loader/>
        )
    }

  return (
    <>
    <div className={styles.body}>
        <div className={styles.head}>
            <div className={styles.title}>
                <h1>{action} news</h1>
            </div>
            <div className={styles.create}>
                <SquareBtn handler={id ? edit : create} width={'200'} type='red' text={action}/>
            </div>
        </div>
        <div className={styles.inputs}>
            <Input
            handler={inputsHandler}
            name={'title'} 
            label={'Title'} 
            placeholder={'Spooky Ooki...'} 
            value={data.title}/>
            <div className={styles.input + ' ' + styles.calendar}>
                <div className={styles.subTitle + ' ' + styles.dateSubTitle}>
                    Date:
                </div>
                <CustomCalender 
                dates={data.date}
                stateHandler={inputsHandler}
                name={'date'}
                range={false}
                />
            </div>
            <div className={styles.input}>
                <div className={styles.subTitle}>
                    Image (600x330):
                </div>
                <FileInput handler={fileHandler} value={img} name={'img'} label={'Img'}/>
            </div>
        </div>
        <div className={styles.recommendations}>
            <div className={styles.recTitle}>
                <h2>Recommendations</h2>
            </div>
            <div className={styles.recItems}>
                <AddBtn id={'toggle-modal'} handler={modalHandler}/>
                <Recommendations remove={recommendationsToggle} items={filteredNews}/>
            </div>
        </div>
        <div className={styles.textEditor}>
            <div className={styles.subTitle}>
                Description:
            </div>
            <div className={styles.editor}>
                <TextEditor value={data.description} name={'description'} handler={inputsHandler}/>
            </div>
        </div>
    </div>
    <RecModal recToggle={recommendationsToggle} news={allNews} visible={state} handler={modalHandler}/>
    <Modal isVisible={success} handler={successModalHandler}>
        <Success/>
        <div className={styles.successBtn}>
            <SquareBtn
            width='330' 
            text={'Go to homepage'} 
            handler={() => router.push('/admin')}
            />
        </div>
    </Modal>
    </>
  )
}
