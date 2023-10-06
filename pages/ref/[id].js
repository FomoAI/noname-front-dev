import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from '../../app/components/head/Head'
import getUserById from '../../app/services/getUserById'

const RefPage = () => {
    const router = useRouter()
    const { id } = router.query

    const relocateToLogin = () => {
        window.location.replace('/info?login=true')
    }

    const relocateToSuccess = () => {
        window.location.replace('/info?activate=true')
    }

    const relocateToError = () => {
        window.location.replace('/info?error=true')
    }

    const getReferralData = () => {
        return JSON.parse(window.localStorage.getItem('userData'))   
    }

    const checkAuth = async () => {
        try{
            const userData = getReferralData()

            if(!userData){
                relocateToLogin()
                return
            }

            if(!userData.isAuth){
                relocateToLogin()
                return
            }

            relocateToSuccess()

        }catch(error){
            console.log(error)
            relocateToLogin()
        }
    }

    const getUser = async () => {        
        const {success,user} = await getUserById(id)

        const currentUserData = getReferralData()

        if(user._id === currentUserData?._id){
            relocateToError()
            return
        }
        
        if(user){
            localStorage.setItem('noname-inviter',JSON.stringify({id,user}))
        }

        checkAuth()
    } 

    useEffect(() => {
        if(!id) return

        getUser()
    },[id])

    return (
      <>
        <Head title={'Referral'}/>
      </>
    );
}

export default RefPage;


