import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Loader from '../../app/assets/components/loader/Loader'
import updateUser from '../../app/services/updateUser'
import HeadBlock from '../../app/components/head/Head'

export default function discord({news}) {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const router = useRouter()
    
    useEffect(() => {
        const discordAuth = async () => {
            if(Object.values(router.query).length){
              const {success,user} = await updateUser({discordData:router.query})
              setLoading(false)
              if(success){
                  localStorage.setItem('connectWalletStep','4')
                  router.push('/info')
              }
            }
        }
        discordAuth()
    },[router.query])

    if(loading){
        return (
            <Loader/>
        )
    }

  return (
    <>
      <HeadBlock title={'Discord'}/>
    </>
  )
}