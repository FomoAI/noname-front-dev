import getUserById from "../services/getUserById";
import getUserData from "./getUserData";

export default async (projectId) => {
    let isClaim;
   
    const userId = getUserData()?._id

    const {user} = await getUserById(userId) 

    const claimedProjects = user?.claims
    
    if(claimedProjects?.length){
        isClaim = claimedProjects.find((pr) => {
            return pr.project === projectId
        })
    }

    return isClaim
}