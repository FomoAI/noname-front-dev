import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('news'),{
            method:'POST',
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