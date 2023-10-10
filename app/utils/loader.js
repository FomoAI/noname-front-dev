const API = 'https://noname-backend-dev-production.up.railway.app/api/static'
// const API = 'https://noname-backend-production.up.railway.app/api/static'
// const API = 'http://localhost:5000/api/static'

export default (src) => {
    return `${API}${src}`
}