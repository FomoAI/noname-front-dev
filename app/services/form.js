import {config} from '../config/api.js'

export default async (data,type = 'community') => {
    try{
        const responce = await fetch(config.createUrl(type),{
            method:'POST',
            body:data
        })

        const {success} = await responce.json()
        
        return {success}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}