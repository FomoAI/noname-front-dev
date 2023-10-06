import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`news/${id}`),{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body:data
        })

        const {success,news} = await responce.json()

        return {success,news}
    }catch(error){
        console.log(error)
        return {success:false,news:[]}
    }
}