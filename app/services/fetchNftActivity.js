import {config} from '../config/api.js'

export default async (collectionAddress,nftSmartId) => {
   try{
      const responce = await fetch(config.createUrl(`history/nfts/${nftSmartId}/${collectionAddress}`))

      const {success,histories} = await responce.json()
      
      return {success,histories}

   }catch(error){
      console.log(error)

      return {success:false,histories:[]}
   }
}