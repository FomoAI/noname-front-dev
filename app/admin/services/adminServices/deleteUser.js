import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (id) => {
    try{
        const username = localStorage.getItem('admin')
        
        if(username !== 'admin'){
            return {success:false}
        }

        const token = getToken()

        const responce = await fetch(config.createUrl(`user/${id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}