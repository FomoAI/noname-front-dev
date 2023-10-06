import {config} from '../config/api.js'

export default async (id,type = 'startup') => {
   try{
    const responce = await fetch(config.createUrl(`${type}/${id}`))

    const {success,project} = await responce.json()
    
    return {success,project}
   }catch(error){
    console.log(error)
    return {success:false}
   }
}