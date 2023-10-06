import {config} from '../../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('academy/authors'))

        const {success,authors} = await responce.json()

        return {success,authors}

    }catch(error){
        return {success:false,error}
    }
}