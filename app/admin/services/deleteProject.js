import {config} from '../../config/api'
import getToken from '../../utils/getToken'

export default async (id,type = 'project') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`${type}/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}