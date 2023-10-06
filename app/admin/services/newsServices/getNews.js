import {config} from '../../../config/api'

export default async (id) => {
    if(id){
        try{
            const responce = await fetch(config.createUrl(`news/${id}`),{
                method:'GET',
            })
    
            const {success,news} = await responce.json()
    
            return {success,news}
    
        }catch(error){
            return {success:false,error,news:[]}
        }
    }else{
        try{
            const responce = await fetch(config.createUrl('news'),{
                method:'GET',
            })
    
            const {success,news} = await responce.json()
    
            return {success,news}
    
        }catch(error){
            return {success:false,error,news:[]}
        }
    }
    
}