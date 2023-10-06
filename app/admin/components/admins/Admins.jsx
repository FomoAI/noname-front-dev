import { useState} from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/admins.module.scss'
import Admin from '../admin/Admin'
import AddBtn from '../../UI/AddBtn'
import Input from '../../UI/Input'
import useModal from '../../../hooks/useModal'
import ConfirmModal from '../confirmModal/ConfirmModal'
import confirmPassword from '../../services/adminServices/confirmPassword'
import createAdmin from '../../services/adminServices/createAdmin'
import deleteAdmin from '../../services/adminServices/deleteAdmin'
import Loader from '../../../assets/components/loader/Loader'

export default function Admins({admins}) {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const {modalHandler,state} = useModal()
    const [confirm,setConfirm] = useState('')
    const [action,setAction] = useState('')
    const [selectedAdmin,setSelectedAdmin] = useState('')
    const [newAdmin,setNewAdmin] = useState(null)

    const adminHandler = () => {
        setNewAdmin({username:'',password:''})
    }

    const inputsHandler = (name,value) => {
        if(name === 'confirm'){
            setConfirm(value)
            return
        }
        setNewAdmin({...newAdmin,[name]:value})
    }

    const selectAction = (event,username) => {
        event.preventDefault()
        modalHandler(null,true)
        setAction(event.target.id)
        if(username){
            setSelectedAdmin(username)
        }
    }

    const confirmAction = async () => {
        try{
            setLoading(true)
            const {success} = await confirmPassword(confirm)
            if(!success){
                alert('Confirm error')
                return
            }

            if(action === 'create' && newAdmin){
                const {success} = await createAdmin(newAdmin)
                success && router.reload()
                !success && alert('Something went wrong...')
            }

            if(action === 'remove' && selectedAdmin && admins.length > 1){
                const {success} = await deleteAdmin(selectedAdmin)
                success && router.reload()
                !success && alert('Something went wrong...')
            }
            setLoading(false)
            setConfirm('')
        }catch(error){
            setLoading(false)
            alert(error)
        }
    }

    if(loading){
        return (
            <Loader/>
        )
    }

  return (
    <>
    <div className={styles.body}>
        <div className={styles.title}>
            Admins
        </div>
        <div className={styles.list}>
            {admins.map((admin) => {
                return (
                    <Admin 
                    selectAction={selectAction}
                    key={admin.username} 
                    admin={admin}/>
                )
            })}
            {
                newAdmin
                ?
                <form onSubmit={(e) => e.preventDefault()} className={styles.newAdmin}>
                    <Input 
                    handler={inputsHandler}
                    label={'Username'}
                    placeholder={'admin'}
                    value={newAdmin.username}
                    name={'username'}
                    />
                    <Input 
                    type={'password'}
                    handler={inputsHandler}
                    label={'Password'}
                    placeholder={'********'}
                    value={newAdmin.password}
                    name={'password'}
                    />
                    <button id='create' onClick={selectAction} className={styles.save}>
                        Save
                    </button>
                </form>
                :
                <></>
            }
            <div className={styles.add}>
                <AddBtn handler={adminHandler}/>
            </div>
        </div>
    </div>
    <ConfirmModal
    confirm={confirmAction}
    value={confirm} 
    inputsHandler={inputsHandler}
    state={state} 
    modalHandler={modalHandler}/>
    </>
  )
}
