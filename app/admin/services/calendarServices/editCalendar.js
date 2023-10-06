import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id = null,data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('calendar'),{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({id,data})
        })

        const {success,calendar} = await responce.json()

        return {success,calendar}

    }catch(error){
        return {success:false,error,calendar:[]}
    }
}