import { url } from "../config/api"        

export default (id) => {
    return `${url}ref/${id}`
}