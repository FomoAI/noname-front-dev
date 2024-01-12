import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,type = 'project') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`projects/claim/${type}/${id}`),{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        const {success,project} = await responce.json()

        return {success,project}
    }catch(error){
        return {success:false,project:{}}
    }
}