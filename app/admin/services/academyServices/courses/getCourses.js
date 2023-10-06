import {config} from '../../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('academy/courses'))

        const {success,courses} = await responce.json()

        return {success,courses}

    }catch(error){
        return {success:false,error}
    }
}