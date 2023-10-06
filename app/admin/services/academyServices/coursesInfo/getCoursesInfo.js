import {config} from '../../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('academy/info'))

        const {success,coursesInfo} = await responce.json()

        return {success,coursesInfo}

    }catch(error){
        return {success:false,error}
    }
}