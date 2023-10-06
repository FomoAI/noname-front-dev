
export default (newData) => {
    const oldData = JSON.parse(localStorage.getItem('userData'))

    localStorage.setItem('userData',JSON.stringify({...oldData,...newData}))
}