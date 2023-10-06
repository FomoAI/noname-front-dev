import styles from '../../styles/rec-modal.module.scss'
import Modal from '../../../assets/components/modal/Modal'
import Image from 'next/image';
import loader from '../../../utils/loader'
import successSvg from '../../../assets/icons/complete.svg'

const RecModal = ({visible,handler,news,recToggle}) => {
    return (
        <Modal width='800' isVisible={visible} handler={handler}>
            <div className={styles.body}>
                {news.map((item) => {
                    return (
                        <div
                        onClick={() => recToggle(item._id)}
                        key={item._id} 
                        className={item.selected ? 
                        styles.item + ' ' + styles.selected 
                        : 
                        styles.item
                        }>
                            <div className={styles.img}>
                                <Image 
                                width={'230'}
                                height={'230'}
                                loader={() => loader(item.img)} 
                                src={item.img}
                                alt={item.title}
                                />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.date}>
                                    {item.date}
                                </div>
                                <div className={styles.title}>
                                    {item.title}
                                </div>
                            </div>
                           {
                            item.selected
                            ?
                            <div className={styles.selectedIcon}>
                                <Image src={successSvg} alt={'selected'}/>
                            </div>
                            :
                            <></>
                           }
                        </div>
                    )
                })}
            </div>
        </Modal>
    );
}

export default RecModal;
