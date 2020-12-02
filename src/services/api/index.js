import axios from 'axios'

import store from '../../redux/store'

const tokenInterceptor = (config) => {
    if (config.headers.Authorization) {
        return config
    }

    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

const getToken = () => {
    const state = store.getState()

    return state.auth?.token?.access_token
}

const $axios = axios.create({
    baseURL: 'http://localhost:8000/client-api/',
})
$axios.interceptors.request.use(tokenInterceptor)

export {
    $axios,
    getToken,
}