
export default (data,lang,separator = '') => {
    const currentLangData = {}

    for (const key in data) {

        if(key === 'discordLink'){
            currentLangData[key] = data[key]
        }

        if(lang === 'ENG' && key.includes('ENG')){
            const currentKey = key.split(separator ? separator :lang)[0]

            currentLangData[currentKey] = data[key]
        }

        if(lang === 'UA' && key.includes('UA')){
            const currentKey = key.split(separator ? separator :lang)[0]

            currentLangData[currentKey] = data[key]
        }

    }

    return currentLangData
}