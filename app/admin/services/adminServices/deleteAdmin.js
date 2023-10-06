import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (username) => {
    try{
        if(username === 'admin'){
            return {success:false}
        }
        const token = getToken()

        const responce = await fetch(config.createUrl(`admin/${username}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,error} = await responce.json()

        return {success,error}

    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}