import { config } from "../config/api"

export default async (data) => {
    try{
        const response = await fetch(config.createUrl(`history/nfts`),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({...data,date:new Date().getTime()})
        })

        const {success,history} = await response.json()

        return {success,history}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}