import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`news/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success,news} = await responce.json()

        return {success,news}
    }catch(error){
        console.log(error)
        return {success:false,news:[]}
    }
}