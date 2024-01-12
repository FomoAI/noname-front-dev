import {config} from '../config/api.js'

export default async (collectionAddress,nftId) => {
    try{
        const responce = await fetch(config.createUrl(`bids/${collectionAddress}/${nftId}`))

        const {success,bids} = await responce.json()
        
        return {success,bids}

    }catch(error){
        console.log(error)
        return {success:false,bids:[]}
    }
}