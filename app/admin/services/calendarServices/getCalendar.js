import {config} from '../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('calendar'),{
            method:'GET',
        })

        const {success,calendar} = await responce.json()

        return {success,calendar}

    }catch(error){
        return {success:false,error,calendar:[]}
    }
}