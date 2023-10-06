import {config} from '../config/api.js'

export default async (address) => {
    try{
        const responce = await fetch(config.createUrl(`ref/item/${address}`),)

        const {success,item} = await responce.json()

        return {success,item}

    }catch(error){
        console.log(error)
        return {success:false,item:{}}
    }
}