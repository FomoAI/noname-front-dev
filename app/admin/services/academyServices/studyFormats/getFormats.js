import {config} from '../../../../config/api'

export default async (id) => {
    try{
        const responce = await fetch(config.createUrl('academy/formats'))

        const {success,studyFormats} = await responce.json()

        return {success,studyFormats}

    }catch(error){
        return {success:false,error}
    }
}