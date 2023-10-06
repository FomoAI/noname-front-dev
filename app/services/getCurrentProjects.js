import {config} from '../config/api.js'

export default async (type = 'projects') => {
    try{
        const responce = await fetch(config.createUrl(`projects/${type}`))
        
        if(!responce.ok){
            return {success:false,projects:[]}
        }   
        const {success,projects} = await responce.json()
        
        return {success,projects}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}