import {config} from '../../../config/api'

export default async () => {
    try{
        const responce = await fetch(config.createUrl('header'))
        
        const {success,header} = await responce.json()
        
        return {success,header}
    }catch(error){
        console.log(error)
        return {success:false,header:null}
    }
}