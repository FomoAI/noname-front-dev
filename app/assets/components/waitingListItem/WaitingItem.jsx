import styles from './waiting-item.module.scss'
import starSvg from '../../../assets/icons/star.svg'
import Image from 'next/image'
import loader from '../../../utils/loader'

const types = [
  {
      label:'Noname Key',
      value:'nonamekey',
  },
  {
      label:'Crypto',
      value:'crypto'
  },
  {
      label:'Business',
      value:'business'
  },
  {
      label:'zKsync',
      value:'zksync'
  },
]


export default function WaitingItem({type,remove,item}) {
    const collectionType = types.find((type) => type.value === item.type)

  return (
    <>    
    <div className={styles.body}>
       <div className={styles.project}>
            <div className={styles.projectImg}>
                <Image 
                loader={() => loader(item.img || item.project.img || item.image)} 
                width={'32'} 
                height={'32'} 
                src={item.img || item.project?.img || item?.image} 
                alt={'img'}/>
            </div>
            <div className={styles.projectInfo}>
                <span className={styles.name}>{item.title || item.name}</span>
                <span className={styles.value}>{item.description || item.project.description}</span>
            </div>
       </div>
       <div className={styles.status}>
         {item.status || item.project.status || 'Active'}
       </div>
       <div className={styles.info}>
            {item.goal || item.project.goal || '-'}
       </div>  
       <div className={styles.info}>
            {item.funded || item.project.funded || '-'}
       </div>
       <div className={styles.info}>
         {item.lastFunding || item.project.lastFunding || '-'}
       </div>
       <div className={styles.info}>
         {collectionType?.label || item.type || 'Nft'}
       </div>
       <div className={styles.rating}>
         {new Array(item.rating || item.project.rating).fill(1).map((value,index) => {
            return <Image src={starSvg} alt='star' key={index}/>
         })}
       </div>
       <div className={styles.remove}>
         <button onClick={() => remove(item,type)} type={'button'}>-</button>
       </div>
    </div>
    <hr className={styles.line}/>
 
    </>
  )
}
