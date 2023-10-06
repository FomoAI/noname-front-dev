import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,percentData) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`ref/data/percent/${id}`),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(percentData)
        })

        const {success,data} = await responce.json()

        return {success,data}

    }catch(error){
        return {success:false,error,data:{}}
    }
}