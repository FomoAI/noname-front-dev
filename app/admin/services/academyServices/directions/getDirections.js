import {config} from '../../../../config/api'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl('academy/directions'))

        const {success,directions} = await responce.json()

        return {success,directions}

    }catch(error){
        return {success:false,error}
    }
}