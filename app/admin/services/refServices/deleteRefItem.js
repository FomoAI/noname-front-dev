import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`ref/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        return {success:false,error:{}}
    }
}