import { useLayoutEffect, useState } from 'react';
import styles from './styles/footer.module.scss'
import Image from 'next/image';
import Modal from '../../assets/components/modal/Modal';
import useModal from '../../hooks/useModal';
import HTMLReactParser from 'html-react-parser'
import icons from '../../assets/icons/socialmedia'

const Footer = ({footerData}) => {
    const [selectedLink,setSelectedLink] = useState(null)
    const {modalHandler,state} = useModal()

    const modalToggle = (event,link) => {
        modalHandler(event)
        setSelectedLink(link)
    } 

    return(
        <>
        <footer id='footer-block' className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.textLight}>
                   Noname.io ©{new Date().getFullYear()}
                </div>
                <ul className={styles.links}>
                   <li id='toggle-modal'>
                        <a 
                        href={footerData.whitepaperLink}
                        className={styles.link}>
                            Whitepaper
                        </a>
                    </li>
                    {footerData.links.map((link,index) => {
                        return (
                            <li id='toggle-modal' key={index}>
                                <button 
                                onClick={(e) => modalToggle(e,link)} 
                                id='toggle-modal' 
                                className={styles.link}>
                                    {link.name}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.socialmedia}>
                    {footerData.socialmedia.map((item,index) => {
                        return (
                            <a target={'_blank'} key={index} href={item.link}>
                                <Image src={icons[item.alt]} alt={item.alt}/>
                            </a>
                        )
                    })}
                </div>
            </div>
        </footer>
        {
            selectedLink
            ?
            <Modal
            width='780'
            title={selectedLink.name} 
            handler={modalHandler} 
            isVisible={state}>
                <div className={styles.footerModalText}>
                    {HTMLReactParser(selectedLink.text)}
                </div>
            </Modal>
            :
            <></>
        }
        </>
    )
}

export default Footer;
