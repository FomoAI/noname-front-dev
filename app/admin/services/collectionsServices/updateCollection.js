import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id,data) => {
    try{
        const token = getToken()
        
        const responce = await fetch(config.createUrl(`collection/${id}`),{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })

        const {success,collection} = await responce.json()

        return {success,collection}
    }catch(error){
        console.log(error)
        return {success:false,collection:{}}
    }
}