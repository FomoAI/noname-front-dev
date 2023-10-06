export const url = 'https://noname-front-dev.vercel.app/'
// export const url = 'https://no-name.io/'
// export const url = 'http://localhost:5000/'

export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=https%3A%2F%2Fnoname-backend-dev-production.up.railway.app%2Fdiscord&response_type=code&scope=identify'
// export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=https%3A%2F%2Fnoname-backend-production.up.railway.app%2Fdiscord&response_type=code&scope=identify'
// export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdiscord&response_type=code&scope=identify'

const api = 'https://noname-backend-dev-production.up.railway.app'
// const api = 'https://noname-backend-production.up.railway.app'
// export const api = 'http://localhost:5000'


export const config = {
    createUrl: (path) => `${api}/api/${path}`
}

