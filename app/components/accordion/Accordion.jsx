import styles from './accordion.module.scss'
import SubTitle from '../../assets/components/subTitle/SubTitle'
import { useCallback, useState } from 'react'
import arrow from '../../assets/icons/acc-arrow.svg'
import Image from 'next/image'

export default function Accordion({title,items}) {
    const [accordionItems,setAccordionItems] = useState(() => {
        return items.map((item) => ({...item,isOpen:false}))
    })

    const accordionToggle = useCallback((target) => {
        setAccordionItems((state) => {
            return (
                state.map((item,index) => {
                    if(index === target){
                        return {...item,isOpen:!item.isOpen}
                    }
                    return item
                })
            )
        })
    },[accordionItems])
    
  return (
    <div className={styles.wrapper}>
      <SubTitle>
        {title}
      </SubTitle>
      <div className={styles.body}>
        {accordionItems.map((item,index) => {
            return (
                <button 
                onClick={() => accordionToggle(index)}
                className={styles.accItem}
                style={{'maxHeight': item.isOpen ? '600px' : '80px' } } 
                key={index} >
                    <div className={styles.accToggle}>
                        <span>{item.title}</span>
                        <Image
                        style={{'transform': item.isOpen ? 'rotate(540deg)' : 'rotate(0deg)' } } 
                        src={arrow} 
                        alt='arrow'/>
                    </div>
                    <div  
                    style={{'visibility': item.isOpen ? 'visible' : 'hidden' } } 
                    className={styles.text}>
                        {item.body}
                    </div>
                </button>
            )
        })}
      </div>
    </div>
  )
}
