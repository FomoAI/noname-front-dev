import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('admin/ref'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const {success,item} = await responce.json()

        return {success,item}

    }catch(error){
        return {success:false,error,item:{}}
    }
}