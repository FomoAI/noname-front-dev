import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`banner/${id}`),{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body:data
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        return {success:false,error}
    }
}