import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('session'),{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        const {success,admin} = await responce.json()
        localStorage.setItem('admin',admin.username)
        return {success,admin}
    }catch(error){
        console.log(error)
        return {success:false,admin:{}}
    }
}