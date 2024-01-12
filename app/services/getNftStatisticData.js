import {config} from '../config/api.js'

export default async (collectionAddress,collectionId,interval,supply,nftId) => {
    try{
        const responce = await fetch(config.createUrl(`nfts/statistics/${collectionAddress}/${collectionId}/${interval}/${supply}/${nftId}`))

        const {success,data} = await responce.json()
        
        return {success,data}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}