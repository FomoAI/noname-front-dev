import {config} from '../config/api.js'
import getDataByLang from '../utils/getDataByLang.js'

export default async (lang) => {
    try{
        const promises = await Promise.all([
            fetch(config.createUrl(`academy`)),
            fetch(config.createUrl(`academy/directions`)),
            fetch(config.createUrl(`academy/authors`)),
            fetch(config.createUrl(`academy/formats`)),
            fetch(config.createUrl(`academy/reviews`)),
            fetch(config.createUrl(`academy/courses`)),
            fetch(config.createUrl(`academy/info`)),
        ])

        const academyPageData = {}

        for (let i = 0; i < promises.length; i++) {
            const data = await promises[i].json()

            const key = Object.keys(data)[1]

            const separator = key === 'academy' ? lang : '_'

            const currentLangSection = getDataByLang(data[key],lang,separator)

            academyPageData[key] = currentLangSection 

        }
        
        return {success:true,academyPageData:academyPageData}

    }catch(error){
        console.log(error)
        return {success:false,academyPageData:{}}
    }
}