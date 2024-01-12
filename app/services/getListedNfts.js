import {config} from '../config/api.js'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl('nfts/' + id))
        
        if(!responce.ok){
            return {success:false,nft:{}}
        }   
        const {success,nft,ethExchange} = await responce.json()
        
        return {success,nft,ethExchange}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}