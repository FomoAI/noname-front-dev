import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (newData) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`info`),{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body:newData
        })

        const {success,info} = await responce.json()
        return {success}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}