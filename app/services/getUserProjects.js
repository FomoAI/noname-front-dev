import {config} from '../config/api.js'

export default async (address) => {
    try{
        const responce = await fetch(config.createUrl(`user/projects/${address}`),)

        const {success,projects} = await responce.json()

        return {success,projects}

    }catch(error){
        console.log(error)
        return {success:false,projects:[]}
    }
}