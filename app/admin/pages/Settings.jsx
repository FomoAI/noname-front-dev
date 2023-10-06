import styles from '../styles/settings.module.scss'
import HeaderSettings from '../components/header/HeaderSettings';
import FooterSettings from '../components/footer/FooterSettings';

const Settings = ({header,footer}) => {
    return (
        <div className={styles.body}>
            <HeaderSettings headerData={header}/>
            <hr className={styles.line}/>
            <FooterSettings footerData={footer}/>
        </div>
    );
}

export default Settings;
