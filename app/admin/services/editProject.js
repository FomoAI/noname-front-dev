import {config} from '../../config/api'
import getToken from '../../utils/getToken'

export default async (id,newData,type = 'project') => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`${type}/${id}`),{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body:newData
        })

        const {success,project} = await responce.json()
        return {success}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}