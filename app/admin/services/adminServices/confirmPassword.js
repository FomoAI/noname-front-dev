import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (password) => {
    try{
        const username = localStorage.getItem('admin')

        const token = getToken()
        
        const responce = await fetch(config.createUrl('confirm'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({username,password})
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}