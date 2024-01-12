import { config } from "../config/api"

export default async (userAddress,nftId,collectionAddress,collectionId,data) => {
    try{
        const response = await fetch(config.createUrl(`bids/${collectionAddress}/${userAddress}/${nftId}/${collectionId}`),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })

        const {success,bid} = await response.json()

        return {success,bid}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}