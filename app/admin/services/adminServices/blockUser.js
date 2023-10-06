import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`user/${id}`),{
            method:'PATCH',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
            },
        })

        const {success,user} = await responce.json()

        return {success,user}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}