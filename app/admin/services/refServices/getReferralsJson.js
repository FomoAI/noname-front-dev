import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('referrals/json'),{
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,path} = await responce.json()

        return {success,path}

    }catch(error){
        return {success:false,error,path:''}
    }
}