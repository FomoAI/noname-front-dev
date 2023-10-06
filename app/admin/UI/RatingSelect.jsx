import { useState } from "react"
import styles from '../styles/rating.module.scss'

export default function RatingSelect({handler,name}) {
    const [rating,setRating] = useState(() => new Array(3).fill('1'))
    const [selected,setSelected] = useState(3)

    const ratingHandler = (event,value) => {
        if(value === selected){
            setSelected(0)
            handler(name,value)
            return
        }
        setSelected(value)
        handler(name,value)
    }

  return (
    <div className={styles.body}>
        <svg display='none'>
            <symbol id="star" width="18" height="17" viewBox="0 0 18 17"  xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M8.1015 0.839004C8.46697 0.0909832 9.53303 0.0909821 9.89849 0.839003L11.6883 4.50223C11.834 4.80049 12.1182 5.007 12.4469 5.05342L16.4839 5.62359C17.3083 5.74002 17.6377 6.7539 17.0392 7.33263L14.1084 10.1668C13.8697 10.3976 13.7612 10.7317 13.8186 11.0586L14.5238 15.0743C14.6678 15.8942 13.8054 16.5209 13.07 16.1305L9.46887 14.2189C9.17566 14.0632 8.82434 14.0632 8.53113 14.2189L4.92999 16.1305C4.19464 16.5209 3.33218 15.8942 3.47619 15.0743L4.18143 11.0586C4.23885 10.7317 4.13028 10.3976 3.89165 10.1668L0.960782 7.33263C0.362307 6.7539 0.691736 5.74002 1.51608 5.62359L5.55309 5.05342C5.88178 5.007 6.16601 4.80049 6.31174 4.50223L8.1015 0.839004Z" />
                </g>
            </symbol>
        </svg>
        <div className={styles.row}>
            {rating.map((v,index) => {
                if((index + 1) <= selected){
                    return (
                        <button key={index} name={name} onClick={(event) => ratingHandler(event,1 + index)}>
                            <svg name={name} key={index} className={styles.icon + ' ' + styles.selected}>
                                <use name={name} href="#star"></use>
                            </svg>
                        </button>
                        )
                }
                return (
                    <button key={index} name={name} onClick={(event) => ratingHandler(event,1 + index)}>
                        <svg name={name} key={index} className={styles.icon }>
                            <use name={name} href="#star"></use>
                        </svg>
                    </button>
                    )
            })}   
        </div>
    </div>
  )
}
