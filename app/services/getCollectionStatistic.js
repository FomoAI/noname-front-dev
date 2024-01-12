import {config} from '../config/api.js'

export default async (collectionAddress,collectionId,interval,supply) => {
    try{
        const responce = await fetch(config.createUrl(`collection/statistic/${collectionAddress}/${collectionId}/${interval}/${supply}`))

        const {success,data} = await responce.json()
        
        return {success,data}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}