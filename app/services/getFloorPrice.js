import {config} from '../config/api.js'

export default async (collectionAddress,nftId,currency) => {
    try{
        const responce = await fetch(config.createUrl(`bids/price/${collectionAddress}/${nftId}/${currency}`))
        
        if(!responce.ok){
            return {success:false,floorPrice:0}
        }   
        const {success,floorPrice} = await responce.json()
        
        return {success,floorPrice}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}