import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const token = getToken()
        
        const responce = await fetch(config.createUrl(`collection/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })

        const {success,collection} = await responce.json()

        return {success,collection}
    }catch(error){
        console.log(error)
        return {success:false,collection:{}}
    }
}