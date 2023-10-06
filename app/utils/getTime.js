
export default (date) => {
    if(date === 'TBA'){
        return date
    }
    return date.split('.').reverse().join('-')
}