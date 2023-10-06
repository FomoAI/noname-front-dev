import {useRouter} from 'next/router'
import Error404 from  '../../assets/lotties-animations/404.json'
import Lottie from "lottie-react";
import styles from '../styles/404.module.scss'

export default function Page404() {
    const router = useRouter()

  return (
    <div className={styles.body}>
        <Lottie animationData={Error404}/>
        <button 
        onClick={() => router.back()}
        className={styles.btn}>Back</button>
    </div>
  )
}
