import {config} from '../config/api.js'

export default async (address,rewards) => {
    try{
        const responce = await fetch(config.createUrl(`user/rewards/${address}`),{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({rewards})
        }) 

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)

        return {success:false}
    }
}