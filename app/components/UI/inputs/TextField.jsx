import styles from './text-field.module.scss'
import search from '../../../assets/icons/search.svg'
import Image from 'next/image';

const TextField = ({id = '',value,handler}) => {
    return (
        <div id={id} className={styles.wrapper}>
            <Image className={styles.search} src={search} alt={'search-svg'}/>
            <input value={value} onChange={handler} className={styles.input} type="text" placeholder={'Search'}/>
        </div>
    );
}

export default TextField;
