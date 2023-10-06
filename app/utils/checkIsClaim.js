

export default (projectId) => {
    let isClaim;
   
    const claimedProjects = JSON.parse(localStorage.getItem('isClaimed'))
    
    if(claimedProjects?.length){
        isClaim = claimedProjects.find((pr) => {
            return pr.project === projectId
        })
    }

    return isClaim
}