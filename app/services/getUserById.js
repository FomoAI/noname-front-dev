import {config} from '../config/api.js'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl(`user/${id}`),)

        const {success,user} = await responce.json()

        return {success,user}

    }catch(error){
        console.log(error)
        return {success:false,user:{}}
    }
}