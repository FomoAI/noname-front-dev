import {config} from '../config/api.js'

export default async (userData) => {
    try{
        const responce = await fetch(config.createUrl('auth'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(userData)
        })
        const {success,user} = await responce.json()

        return {success,user}

    }catch(error){
        console.log(error)
        return {succes:false,error}
    }
}