import Image from 'next/image'
import styles from './gallery.module.scss'
import SubTitle from '../subTitle/SubTitle'
import loader from '../../../utils/loader'

export default function Gallery({title,text,items}) {
  return (
    <div className={styles.body}>
      <SubTitle>
        {title}
      </SubTitle>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.items}>
        {items.map((item,index) => {
            return (
                <a key={index} href={item.href} target='_blank'>
                    <Image
                    loader={() => loader(item.img)}
                    width={'166'}
                    height={'57'}
                    src={item.img} 
                    alt='gallery-img'
                    />
                </a>
            )
        })}
      </div>
    </div>
  )
}
