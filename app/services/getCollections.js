import {config} from '../config/api.js'

export default async (startLimit = 0,endLimit = 16) => {
    try{
        const responce = await fetch(config.createUrl(`collections/${startLimit}/${endLimit}`))
        
        if(!responce.ok){
            return {success:false,collections:[]}
        }   
        const {success,collections} = await responce.json()
        
        const sortedCollections = collections.sort((a,b) => {
            return b?.isPinned - a?.isPinned
        })  

        return {success,collections:sortedCollections}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}