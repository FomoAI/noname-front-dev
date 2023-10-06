import { useEffect , useCallback,useState,useMemo, useRef} from 'react'
import WaitingList from '../waitingList/WaitingList'
import WaitingListFilter from '../../assets/components/waitingListFilter/WaitingListFilter'
import { useSelector ,useDispatch} from 'react-redux'
import {openModal,closeModal} from '../../store/slices/modalsSlice'
import {setUserData} from '../../store/slices/authSlice'
import favourites from '../../services/favourites'
import styles from '../styles/waiting.module.scss'

export default function WaitingPage({favouritesData}) {
  const [filter,setFilter] = useState('projects')
  const [items,setItems] = useState(() => favouritesData)
  const user = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()

  const removeFromWaitingList = useCallback((item,type) => {
    if(!user.isAuth) return 
    const filteredFavourites = user.favourites.filter((id) => String(id) !== String(item._id))

    setItems((state) => {
      return {...state,[type]:state[type].filter((pr) => String(pr._id) !== String(item._id))}
    })

    dispatch(setUserData({...user,favourites:filteredFavourites}))

    const {success} = favourites(item._id,user.address,'remove')
  },[user,items])
  
  useEffect(() => {
    if(!user.isAuth){
      dispatch(openModal('wallet'))
    }else{
      dispatch(closeModal('wallet'))
    }
  },[user.isAuth])

  return (
    <main className={styles.list}>
        <div className={styles.filter}>
          <WaitingListFilter
          handleFilterChange={(value) => setFilter(value)}
          />
        </div>
        <WaitingList 
        user={user}
        type={filter}
        items={items[filter]}
        removeItem={removeFromWaitingList}
        />
    </main>
  )
}
