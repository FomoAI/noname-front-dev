import { config } from "../config/api"

export default async () => {
    try{
        const responce = await fetch(config.createUrl('header/investments'))
        
        const {success,investments} = await responce.json()
    
        const totalInvest = investments
        
        return {success,investments:totalInvest}
    }catch(error){

        return {success:false,investments:0}
    }
}