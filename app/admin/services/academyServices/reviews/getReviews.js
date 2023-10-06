import {config} from '../../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('academy/reviews'))

        const {success,reviews} = await responce.json()

        return {success,reviews}

    }catch(error){
        return {success:false,error}
    }
}