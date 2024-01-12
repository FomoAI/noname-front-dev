import {config} from '../config/api.js'

export default async (collectionAddress,nftId,user,price) => {
    try{
        const responce = await fetch(config.createUrl(`bid/${collectionAddress}/${nftId}/${user}/${price}`))

        const {success,bid} = await responce.json()
        
        return {success,bid}

    }catch(error){
        console.log(error)
        return {success:false,bid:{}}
    }
}