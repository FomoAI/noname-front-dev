import { getMeInPool, getAllPartnersFromPool } from "../smart/initialSmartMain"


export default async (projects) => {
    try{
        const result = []

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i]
            
            const {sumInvest} = await getAllPartnersFromPool(project.poolId)
            const {data} = await getMeInPool(project.poolId,window.ethereum.selectedAddress)


            result.push({...project,funded:sumInvest,investments:data.invest})
        }
   
        return {success:true,projects:result}

    }catch(error){
        console.log(error)

        return {success:false,projects:[]}
    }
}