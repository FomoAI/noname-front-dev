import {config} from '../../config/api'
import getToken from '../../utils/getToken'

export default async (id,type = 'project') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`projects/${type}/${id}`),{
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