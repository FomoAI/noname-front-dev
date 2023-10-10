import getUserData from "./getUserData";
import claimByUser from '../services/claimByUser'

export default async (project) => {
    const data = {project,isAlreadyClaim:true}
    
    const userId = getUserData()?._id

    const {user,success} = await claimByUser(data,userId) 
    
    return {user,success}
}