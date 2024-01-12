// const API = 'http://localhost:5000/api/static'

import { api } from "../config/api"

export default (src) => {
    return `${api}/api/static${src}`
}