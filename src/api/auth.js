import { $axios } from '../services/api'

export const registerWithVkUser = (vkUser, phone, launchParams) => {
    return $axios
        .post(
            'vk-mini-app/register',
            {
                vkUser,
                phone,
                launchParams,
            }
        )
        .then(response => response.data)
}

export const loginWithVkUser = (vkUser, launchParams) => {
    return $axios
        .post(
            'vk-mini-app/login',
            {
                vkUser,
                launchParams,
            }
        )
        .then(response => response.data)
}

export const fetchMe = () => {
    return $axios
        .get('auth/me')
        .then(response => response.data)
}