import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('admins'),{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        const {success,admins} = await responce.json()
        return {success,admins}
    }catch(error){
        console.log(error)
        return {success:false,admins:{}}
    }
}