import {config} from '../config/api.js'

export default async (collectionAddress,nftSmartId) => {
    try{
        const responce = await fetch(config.createUrl(`history/statistics/${nftSmartId}/${collectionAddress}`))
        
        const {success,data} = await responce.json()
        
        return {success,data}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}