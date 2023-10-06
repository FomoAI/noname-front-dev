import {config} from '../../../config/api'

export default async () => {
    try{

        const responce = await fetch(config.createUrl(`info`),{
            method:'GET',
        })

        const {success,info} = await responce.json()
        
        return {success,info}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}