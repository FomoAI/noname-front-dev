import { endPoolByAdmin } from "../../../../smart/initialSmartMain"
import closeProject from '../../../services/closeProject'

export default async (poolId,isReturn,projectId,type) => {
    try{
        console.log(poolId,isReturn,projectId,type)
        const {success,error} = await endPoolByAdmin(poolId,isReturn)

        if(!success){
            throw new Error(error)
        }

        await closeProject(projectId,type)

        return {success}

    }catch(error){
        console.log(error)
        alert(error)
        return {success:false}
    }
}