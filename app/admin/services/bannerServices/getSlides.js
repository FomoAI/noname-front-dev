import {config} from '../../../config/api'

export default async (id) => {
    if(id){
        try{
            const responce = await fetch(config.createUrl(`banner/${id}`))
    
            const {success,slide} = await responce.json()
    
            return {success,slide}
    
        }catch(error){
            return {success:false,error,slides:[]}
        }
    }else{
        try{
            const responce = await fetch(config.createUrl('banner'))
    
            const {success,slides} = await responce.json()
    
            return {success,slides}
    
        }catch(error){
            return {success:false,error,slides:[]}
        }
    }

}