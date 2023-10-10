import {config} from '../config/api.js'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl(`claim/${id}`))
        
        if(!responce.ok){
            return {success:false,claim:{}}
        }   
        const {success,claim} = await responce.json()
        
        return {success,claim}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}