export default (date) => {
    return new Date(date.split('.').reverse().join('-'))
}