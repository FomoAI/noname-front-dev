import styles from './form.module.scss'
import Modal from '../modal/Modal'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn';
import { useMemo, useState } from 'react';
import form from '../../../services/form';
import validation from '../../../utils/validation';
import Success from '../success/Success'

const Form = ({handler,isVisible}) => {
    const [data,setData] = useState({
        email:'',
        telegram:'@'
    })
    const [file,setFile] = useState(null)
    const [isSuccess,setIsSuccess] = useState(false)

    const fileHandler = (event) => {
        event.preventDefault()
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }

    const resetInputs = () => {
        setData({email:'',telegram:'@'})
        setFile(null)
    }

    const modalHandler = (e) =>{
        handler(e)
        setIsSuccess(false)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('customFile', file);
        formData.append('email', data.email);
        formData.append('telegram', data.telegram);

        const {success} = await form(formData)
        resetInputs()
        setIsSuccess(success)
    }

    const isValid = useMemo(() => {
        return validation(data)
    },[data])

    return (
        <Modal handler={modalHandler} isVisible={isVisible}>
            {
                isSuccess
                ?
                <Success isSuccess={isSuccess}/>
                :
                <form onSubmit={submitForm} className={styles.body}>
                <div className={styles.title}>Cooperation</div>   
                <div className={styles.description}>
                If you have an idea or proposal for cooperation 
                </div>   
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label htmlFor="email-input">Email</label>
                        <input placeholder='user@gmail.com' value={data.email} onChange={(e) => setData({...data,email:e.target.value})} id={'email-input'} type={'email'}/>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="telegram-input">Telegram username</label>
                        <input value={data.telegram} onChange={(e) => setData({...data,telegram:e.target.value})} id={'telegram-input'} type={'text'}/>
                    </div>
                    <div className={styles.file}>
                        <div className={styles.fileDescription}>
                        Add a file with detailed information about idea/plan
                        </div>
                        <div className={styles.fakeInput}>
                            <label htmlFor='file-input' className={styles.fake}>{file ? file.name : '+ Add file'}</label>
                            <input 
                            accept="image/png,application/msword,.doc,image/jpeg,application/pdf"
                            onChange={fileHandler} 
                            type="file" 
                            id={'file-input'} />
                        </div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <SquareBtn disabled={!isValid} btnId={'none'} type='red' text={'Send'} width={'328'}/>
                </div>
                </form>
            }

        </Modal>
    );
}

export default Form;
