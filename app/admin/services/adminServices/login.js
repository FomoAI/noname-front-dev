import {config} from '../../../config/api'
import session from './session'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const responce = await fetch(config.createUrl('login'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({data})
        })

        const {success,admin,token} = await responce.json()
        localStorage.setItem('nonameToken',token)
        return {success,admin}
    }catch(error){
        console.log(error)
        return {success:false,admin:{}}
    }
}