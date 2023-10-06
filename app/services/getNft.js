import {config} from '../config/api.js'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl('nft/' + id))
        
        if(!responce.ok){
            return {success:false,nft:{}}
        }   
        const {success,nft} = await responce.json()
        
        return {success,nft}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}