import {config} from '../config/api.js'

export default async (claim,userId) => {
    try{
        const responce = await fetch(config.createUrl(`user/claim/${userId}`),{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(claim)
        }) 

        const {success,user} = await responce.json()

        return {success,user}

    }catch(error){
        console.log(error)

        return {success:false,user:{}}
    }
}

