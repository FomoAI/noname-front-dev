import {config} from '../../../../config/api'

export default async (id,data) => {
    try{
        const responce = await fetch(config.createUrl('academy'))

        const {success,academy} = await responce.json()

        return {success,academy}

    }catch(error){
        return {success:false,error}
    }
}