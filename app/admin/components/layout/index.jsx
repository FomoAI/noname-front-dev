import { useEffect , useState} from 'react';
import { useRouter } from 'next/router';
import Loader from '../../../assets/components/loader/Loader'
import Header from './Header'
import NavBar from './NavBar';
import styles from '../../styles/layout.module.scss'
import session from '../../services/adminServices/session';

export default function index ({children}){
  const [loading,setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {success,admin} = await session()
      if(!success){
        router.push('/admin/login')
      }else{
        setLoading(false)
      }
    }
    checkAuth()
  },[])

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <>
    <div className={styles.admin}>
      <Header/>
      <div className={styles.body}>
        <NavBar/>
        {children}  
      </div>
    </div>
    </>
);
}