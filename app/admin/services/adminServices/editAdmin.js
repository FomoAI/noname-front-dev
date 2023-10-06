import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (passwords) => {
    try{
        const username = localStorage.getItem('admin')

        const token = getToken()

        const responce = await fetch(config.createUrl(`admin`),{
            method:'PUT',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({username,...passwords})
        })

        const {success,admin} = await responce.json()

        return {success,admin}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}