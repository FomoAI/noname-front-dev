import styles from './mobile.module.scss'
import PinkBtn from '../../../components/UI/buttons/PinkBtn';
import UserSettings from '../../../components/userSettings/UserSettings'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { toggleModalWithoutBlock } from '../../../store/slices/modalsSlice';

const MobileNav = ({navModalState,isAuth,walletsHandler,isVisible,modalHandler,links,user,disconnect}) => {
    const dispatch = useDispatch()

    return (
        <div onClick={modalHandler} id={'modal'} className={isVisible ? styles.modal + ' ' + styles.visible : styles.modal}>
            <nav className={styles.nav}>
                <ul className={isVisible ? styles.links + ' ' + styles.visible : styles.links}>
                <div  className={isVisible ? styles.wlBtn : styles.hide}>
                    {
                        isAuth
                        ?
                        <UserSettings disconnect={disconnect} user={user}/>    
                        :
                        <PinkBtn handler={walletsHandler} text={'Connect wallet'} />
                    }
                </div>
                <li className={styles.investsBtn}>
                    <button 
                    className={navModalState ? styles.rotate : 'none'}
                    onClick={() => dispatch(toggleModalWithoutBlock('nav'))}>
                        Invest
                    </button>
                </li>
                {links.map((link,index) => {
                    if(link.href === '/waitinglist' && user._id){
                        return (
                            <li key={index}>
                                <Link 
                                id='modal' 
                                className={styles.link} 
                                href={`${link.href}/${user._id}`}>
                                    {link.title}
                                </Link>
                            </li>
                        )
                    }

                    return (
                        <li key={index}>
                            <Link 
                            id='modal' 
                            className={styles.link} 
                            href={`${link.href}`}>
                                {link.title}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </nav>
        </div>
    );
}

export default MobileNav;
