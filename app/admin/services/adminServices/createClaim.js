import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()
        
        const responce = await fetch(config.createUrl('claim'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const {success,error} = await responce.json()

        return {success,error}

    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}