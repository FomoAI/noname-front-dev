import { useState } from 'react'
import styles from '../../styles/settings-modal.module.scss'
import Input from '../../UI/Input'
import Modal from '../../../assets/components/modal/Modal'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import editAdmin from '../../services/adminServices/editAdmin'
import Loader from '../../../assets/components/loader/Loader'
import { useId } from 'react'

const SettingsModal = ({state,modalHandler}) => {
    const id = useId()
    const [loading,setLoading] = useState(false)
    const [passwords,setPasswords] = useState({
        oldPassword:'',
        newPassword:''
    })

    const inputsHandler = (name,value) => {
        setPasswords({...passwords,[name]:value})
    }

    const confirmEdit = async (event) => {
        event.preventDefault()
        if(!passwords.newPassword.length || !passwords.newPassword.length){
            return
        }
        setLoading(true)
        const {success} = await editAdmin(passwords)
        if(success){
            setPasswords({
                oldPassword:'',
                newPassword:''
            })
            alert('Your password changed successfully')
        }else{
            alert('Current password is incorrect')
        }
        setLoading(false)
    }

    if(loading){
        return(
            <Loader/>
        )
    }
    
    return (
        <Modal title='Change password' isVisible={state} handler={modalHandler}>
            <div className={styles.username}>
                <span className={styles.key}>Username:</span>
                <span className={styles.value}>{localStorage.getItem('admin')}</span>
            </div>
            <form onSubmit={confirmEdit} className={styles.inputs}>
                <Input
                type={'password'}
                placeholder='**********'
                handler={inputsHandler}
                value={passwords.oldPassword}
                name={'oldPassword'}
                label={'Current password:'}
                />
                 <Input
                type={'password'}
                placeholder='**********'
                handler={inputsHandler}
                value={passwords.newPassword}
                name={'newPassword'}
                label={'New password:'}
                />
                <SquareBtn 
                btnId={id}
                text={'Confirm'}
                width={'320'}
                />
            </form>
        </Modal>
    );
}

export default SettingsModal;
