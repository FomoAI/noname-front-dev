import {config} from '../config/api.js'
import updateUser from './updateUser.js'

export default async (inviter,referral) => {
    try{
        if(!inviter){
            return {success:false}
        }

        await fetch(config.createUrl('ref'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({inviter,referral})
        }) 

        await fetch(config.createUrl(`user/${referral}`),{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({inviter})
        })

        return {success:true}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}