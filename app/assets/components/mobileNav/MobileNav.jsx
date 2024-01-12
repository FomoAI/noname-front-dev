import { useDispatch } from 'react-redux';
import RwaCreditModal from '../rwaCreditNavModal/RwaCreditModal';
import Link from 'next/link'
import NavModal from '../navModal/NavModal';
import PinkBtn from '../../../components/UI/buttons/PinkBtn';
import UserSettings from '../../../components/userSettings/UserSettings'
import styles from './mobile.module.scss'

const MobileNav = ({navModalState,rwaModalState,navModalHandler,rwaModalHandler,isAuth,walletsHandler,isVisible,modalHandler,links,user,disconnect,headerData}) => {

    return (
        <div onClick={modalHandler} id={'modal'} className={isVisible ? styles.modal + ' ' + styles.visible : styles.modal}>
            <nav className={styles.nav}>
                <ul className={isVisible ? styles.links + ' ' + styles.visible : styles.links}>
                <div  className={isVisible ? styles.wlBtn : styles.hide}>
                    {
                        isAuth
                        ?
                        <UserSettings disconnect={disconnect} user={user} />    
                        :
                        <PinkBtn handler={walletsHandler} text={'Connect wallet'} />
                    }
                </div>
                <li className={styles.investsBtn}>
                    <button 
                    className={navModalState ? styles.rotate : 'none'}
                    onClick={navModalHandler}>
                        Invest
                    </button>
                    <NavModal isVisible={navModalState}/>
                </li>
                {links.map((link,index) => {
                    if(link.isBtn){
                        return (
                            <li key={index} className={styles.rwaBtn}>
                            <button 
                            className={rwaModalState ? styles.rotate : 'none'}
                            onClick={rwaModalHandler}>
                                RWA & Credit
                            </button>
                            <RwaCreditModal isVisible={rwaModalState}/>
                        </li>
                        )
                    }
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
