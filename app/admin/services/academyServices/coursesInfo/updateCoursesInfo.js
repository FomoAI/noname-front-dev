import {config} from '../../../../config/api'
import getToken from '../../../../utils/getToken'

export default async (id,data,lang) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl(`academy/info/${id || 'none'}/${lang || 'ENG'}`),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const {success} = await responce.json()

        return {success}

    }catch(error){
        return {success:false,error}
    }
}