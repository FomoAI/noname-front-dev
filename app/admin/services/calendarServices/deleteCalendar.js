import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`calendar/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,calendar} = await responce.json()

        return {success,calendar}

    }catch(error){
        return {success:false,error,calendar:[]}
    }
}