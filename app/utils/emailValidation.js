
export default (email = '') => {
    return email.length > 4 && email.includes('@')
}