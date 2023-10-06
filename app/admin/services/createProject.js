import {config} from '../../config/api'
import getToken from '../../utils/getToken'
    
export default async (data,type = 'project') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(type),{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: data
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}