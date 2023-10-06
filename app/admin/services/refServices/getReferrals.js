import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('ref'),{
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,items} = await responce.json()

        return {success,items}

    }catch(error){
        return {success:false,error,items:[]}
    }
}