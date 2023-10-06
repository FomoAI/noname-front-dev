import { useState } from 'react'
import styles from '../../styles/header.module.scss'
import Image from 'next/image'
import logo from '../../../assets/img/logo.svg'
import {AiOutlineLogout} from 'react-icons/ai'
import logout from '../../services/adminServices/logout'
import { useRouter } from 'next/router'
import Burger from '../../../assets/components/burger/Burger'
import MobileNav from './MobileNav'

export default function Header() {
    const [mobileNavModal,setMobileNavModal] = useState(false)
    const admin = localStorage.getItem('admin')
    const router = useRouter()
    
    const exit = () => {
        logout()
        router.push('/admin/login')
    }

    const mobileNavHandler = (event) => {
        if(event.target.id === 'modal'){
            setMobileNavModal(false)
        }else{
            setMobileNavModal(true)
        }
    }

  return (
    <>
    <header className={styles.body}>
        <div className={styles.row}>
            <div className={styles.info}>
                <div className={styles.img}>
                    <Image width={'128'} src={logo} alt={'logo'}/>
                </div>
                <div className={styles.title}>
                    Admin Panel
                </div>
            </div>
            <div className={styles.userBlock}>
                <div className={styles.user}>
                    {admin}
                </div>
                <div className={styles.logOut}>
                    <button onClick={exit}><AiOutlineLogout/></button>
                </div>
                <div onClick={mobileNavHandler} className={styles.navBtn}>
                    <Burger/>
                </div>
            </div>
        </div>
    </header>
    <MobileNav handler={mobileNavHandler} isVisible={mobileNavModal}/>
    </>
  )
}
