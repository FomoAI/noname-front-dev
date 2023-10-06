import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async () => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('users/excel'),{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        const {success,link} = await responce.json()

        console.log(link)
    }catch(error){
        console.log(error)
        return {success:false,users:[]}
    }
}