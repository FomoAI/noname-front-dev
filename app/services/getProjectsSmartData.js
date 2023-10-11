import { getMeInPool, getAllPartnersFromPool } from "../smart/initialSmartMain"


export default async (projects) => {
    try{
        const result = []

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i]

            const projectData = {...project}

            const {sumInvest} = await getAllPartnersFromPool(project.poolId)

            if(window?.ethereum?.selectedAddress){
                const {data} = await getMeInPool(project.poolId,window.ethereum.selectedAddress)

                projectData.investments = data.invest
            }

            projectData.funded = sumInvest

            result.push(projectData)
        }
   
        return {success:true,projects:result}

    }catch(error){
        console.log(error)

        return {success:false,projects:[]}
    }
}