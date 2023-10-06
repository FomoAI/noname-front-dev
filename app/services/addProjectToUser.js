import {config} from '../config/api.js'

export default async (address,projectId) => {
    try{
        const responce = await fetch(config.createUrl(`user/projects/${address}`),{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({projectId})
        }) 

        const {success} = await responce.json()

        return {success}

    }catch(error){
        console.log(error)

        return {success:false}
    }
}