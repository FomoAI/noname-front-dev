import { config } from "../config/api"

export default async (id) => {
    try{
        const response = await fetch(config.createUrl(`bids/${id}`),{
            method:'DELETE',
        })

        const {success,bid} = await response.json()

        return {success,bid}
    }catch(error){
        console.log(error)

        return {success:false}
    }
}