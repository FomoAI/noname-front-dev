import {config} from '../../../../config/api'
import getToken from '../../../../utils/getToken'

export default async (id,data,lang) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`academy/authors/${id || 'none'}/${lang || 'ENG'}`),{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body:data
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        return {success:false,error}
    }
}