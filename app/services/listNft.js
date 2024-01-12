import {config} from '../config/api.js'

export default async (nftId,data) => {
    try{
        const responce = await fetch(config.createUrl(`nfts/${nftId}`),{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })

        const {success,nft} = await responce.json()

        return {success,nft}

    }catch(error){
        console.log(error)
        return {success:false,nft:{}}
    }
}