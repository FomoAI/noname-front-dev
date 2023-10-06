
export default (goal) => {
    if(!goal) return 0
    
    return parseFloat(String(goal).replace(/[$,]/g, ''))
}