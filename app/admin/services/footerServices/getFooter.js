import {config} from '../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('footer'))

        const {success,footer} = await responce.json()

        return {success,footer}
    }catch(error){
        console.log(error)
        return {success:false,footer:null}
    }
}