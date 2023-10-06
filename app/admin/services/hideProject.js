import {config} from '../../config/api'
import getToken from '../../utils/getToken'

export default async (id,type = 'startup') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`hide/${type}/${id}`),{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        const {success} = await responce.json()

        return {success}
    }catch(error){
        return {success:false}
    }
}