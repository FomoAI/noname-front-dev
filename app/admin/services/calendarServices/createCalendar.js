import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('calendar'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const {success,calendar} = await responce.json()

        return {success,calendar}

    }catch(error){
        return {success:false,error,calendar:[]}
    }
}