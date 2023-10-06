

export default (project) => {
    const isClaimed = localStorage.getItem('isClaimed')
    let data;
    if(isClaimed){
        data = JSON.stringify([...JSON.parse(isClaimed),{isAlreadyClaim:true,poolId:project.poolId,project:project._id}])

    }else{
        data = JSON.stringify([{isAlreadyClaim:true,poolId:project.poolId,project:project._id}])
    }      

    localStorage.setItem(
        'isClaimed',
        data
    )

    return data
}