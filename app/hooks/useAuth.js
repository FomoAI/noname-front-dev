import { useCallback , useEffect} from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../store/slices/authSlice"
import auth from "../services/auth"
import getInviter from '../utils/getInviterInfo'
import balanceParse from "../utils/balanceParse"

export default function useAuth() {
    const dispatch = useDispatch()
    
    const disconnectHandler = useCallback(() => {
        localStorage.removeItem('userData')
        dispatch(setUserData({address:'',balance:'',isAuth:false,favourites:[]}))
    },[])

    const changeAccount = useCallback( (data = '') => {
        try{
            let address = data?.selectedAddress || data
            address = address?.address ? address.address : address

            const inviter = getInviter()
   
            balanceParse(address.toString()).then(async (balance) => {
                const authData = {
                    address:address.toString().toLowerCase(),
                    balance,
                }

                if(inviter?.user?.address){
                    authData.inviter = inviter.user.address
                }

                const {success,user} = await auth(authData)

                const isAuth = !!user?.discordData?.username

                if(success){
                    // после успешной покупки реферала в список рефералов пригласителя в базу данных
                    dispatch(setUserData({...user,isAuth:isAuth}))
                }else{
                    alert('Something going wrong')
                }
            })
        }catch(error){
            console.log(error)
        }
    },[])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))

        if(userData?.address){
            dispatch(setUserData(userData))
        }     

        setTimeout(() => {
            if(!window?.ethereum?.selectedAddress){
                disconnectHandler()
                return
            }
        },1500)
    },[])

  return {disconnectHandler,changeAccount}
}
