import styles from '../../styles/social-media.module.scss'
import Image from 'next/image'
import icons from '../../../assets/icons/socialmedia/socialmedia'

export default function SocialMedia({projectSocialMedia,handler,name}) {
  return (
    <div className={styles.body}>
        {projectSocialMedia.map((item,index) => {
            return (
                <div key={item.alt} className={styles.item}>
                    {
                        item.alt.includes('web')
                        ?
                        <Image width={'16'} height={'16'} src={icons.web} alt={item.alt}/>
                        :
                        <Image width={'16'} height={'16'} src={icons[item.alt]} alt={item.alt}/>
                    }
                    <input 
                    placeholder={'https://example.com'} 
                    id={'link'} 
                    className={styles.link} 
                    onChange={(event) => handler(event,index)} 
                    type="text" 
                    value={item.link}/>
                    {
                        item.isSelect
                        ?
                        <label className={styles.selected} htmlFor={`checked${index}`}>&#10003;</label>
                        :
                        <label htmlFor={`checked${index}`}></label>
                    }
                    <input 
                    className={styles.hide}
                    checked={item.isSelect} 
                    id={`checked${index}`} 
                    onChange={(event) => handler(event,index)} 
                    type="checkbox" />
                </div>
            )
        })}
    </div>
  )
}
