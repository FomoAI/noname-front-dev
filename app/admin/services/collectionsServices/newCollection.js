import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()
        
        const responce = await fetch(config.createUrl('collection'),{
            method:'POST',
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