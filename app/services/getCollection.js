import {config} from '../config/api.js'

export default async (id,startLimit = 0,endLimit = 16) => {
    try{
        const responce = await fetch(config.createUrl(`collection/${id}/${startLimit}/${endLimit}`))
        
        if(!responce.ok){
            return {success:false,projects:[]}
        }   
        const {success,collection,ethExchange} = await responce.json()
        
        return {success,collection,ethExchange}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}