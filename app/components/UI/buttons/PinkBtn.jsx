import styles from './btn.module.scss'
import Link from 'next/link';

const PinkBtn = ({text,href = '',handler,id=''}) => {
    if(!href){
        return <button className={styles.btn} onClick={handler} type={'button'}>{text}</button>
    }

    return (
        <a id={id} target={'_blank'} onClick={handler} href={href} className={styles.link}>{text}</a>
    );
}

export default PinkBtn;
