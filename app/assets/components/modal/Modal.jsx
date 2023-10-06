import { useRef} from 'react'
import Image from 'next/image'
import Lottie from 'lottie-react'
import { Transition } from 'react-transition-group'
import closeLottie from '../../lotties-animations/NN Закрыть модальное .json'
import closeSvg from '../../icons/close.svg'
import styles from './modal.module.scss'

export default function Modal({
    bodyClass = 'none',
    handler,
    isVisible,
    title = '',
    width = '',
    padding ='16',
    overflowY = 'unset',
    transform = 'translate(0px,0px)',
    closeSize = 'default',
    onClose = () => console.log('none'),
    children
}) 
    {

    const nodeRef = useRef(null)
    const transitionStyles = {
        entering: { opacity: 1 ,visibility:'visible'},
        entered:  { opacity: 1 ,visibility:'visible'},
        exiting:  { opacity: 0 ,visibility:'hidden'},
        exited:  { opacity: 0 ,visibility:'hidden'},
    };
    
  return (
        <Transition in={isVisible} timeout={1000} nodeRef={nodeRef}>
                {
                    (state) => (
                        <div 
                        id={'toggle-modal'} 
                        onClick={handler}  
                        ref={nodeRef} 
                        style={{...transitionStyles[state],overflowY:overflowY}} 
                        className={styles.modal}>
                        <div 
                        style={{maxWidth:`${width}px`,padding:`${padding}px`,transform:transform}} 
                        className={styles.body + ' ' + styles[bodyClass]}>
                            <div className={styles.head}>
                                <span>{title}</span>
                                {
                                    closeSize === 'default'
                                    ?
                                    <button className={styles.closeBtn} id={'toggle-modal'} type={'button'}>
                                    <Image id={'toggle-modal'} src={closeSvg} alt={'close-modal'}/>
                                    </button>
                                    :
                                    <button 
                                    onClick={onClose}
                                    className={styles.closeBtn + ' ' + styles.bigSize} type={'button'}>
                                    {/* <Image id={'toggle-modal'} src={closeSvg} alt={'close-modal'}/> */}
                                        <div className={styles.lottieWrapper}>
                                            <Lottie animationData={closeLottie}/>
                                        </div>
                                    </button>
                                }

                            </div>
                            <div>
                                {children}
                            </div>
                        </div>
                        </div>
                    )
                }
        </Transition>
  )
}
