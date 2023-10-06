import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('ref/data/percent'),{
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,data} = await responce.json()

        return {success,data}

    }catch(error){
        return {success:false,error,data:{}}
    }
}