import Admins from '../components/admins/Admins';
import UsersTable from '../components/users/UsersTable';
import Referrals from '../components/referrals/Referrals';
import styles from '../styles/home.module.scss'

const Home = ({admins,users}) => {
    return (
        <div className={styles.body}>
            <div className={styles.title}>
                <h1>Home page</h1>
            </div>
            <div className={styles.admins}>
                <Admins admins={admins}/> 
            </div>
            <div className={styles.users}>
                <UsersTable users={users}/>
            </div>
            <div className={styles.referrals}>
                <Referrals/>
            </div>
        </div>
    );
}

export default Home;
