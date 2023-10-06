import {config} from '../config/api.js'

export default async (collectionId,name) => {
    try{
        const responce = await fetch(config.createUrl(`nfts/${collectionId}/${name}`))
        
        if(!responce.ok){
            return {success:false,nft:[]}
        }   
        const {success,nfts} = await responce.json()
        
        return {success,nfts}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}