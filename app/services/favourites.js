import {config} from '../config/api.js'

export default async (id,address,action = 'create') => {
    if(action === 'create'){
        try{
            const responce = await fetch(config.createUrl('favourites'),{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id,address})
            })
    
            const {success} = await responce.json()
    
            return {success}
        }catch(error){
            console.log(error)
            return {success:false}
        }
    }
    if(action === 'remove'){
        try{
            const responce = await fetch(config.createUrl('favourite'),{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id,address})
            })
    
            const {success} = await responce.json()
    
            return {success}
        }catch(error){
            console.log(error)
            return {success:false}
        }
    }
   
}