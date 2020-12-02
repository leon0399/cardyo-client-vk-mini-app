import bridge from '@vkontakte/vk-bridge'

import { loginWithVkUser, registerWithVkUser, fetchMe } from '../../api/auth'

import {
    REQUEST_VK_USER,
    SUCCESS_VK_USER,
    FAIL_VK_USER,

    REQUEST_USER,
    SUCCESS_USER,
    FAIL_USER,

    SET_TOKEN,
} from '../types'

const getVkUser = () => async (dispatch) => {
    await dispatch({
        type: REQUEST_VK_USER,
    })

    try {
        const vkUser = await bridge.send('VKWebAppGetUserInfo')

        await dispatch({
            type: SUCCESS_VK_USER,
            payload: {
                ...vkUser,
            },
        })
    } catch (e) {
        await dispatch({
            type: FAIL_VK_USER,
            payload: console.error(e),
        })
    }
}

const login = (launchParams) => async (dispatch, getState) => {
    await dispatch({
        type: REQUEST_USER,
    })

    await dispatch(getVkUser())

    const state = getState()

    try {
        const token = await loginWithVkUser(
            state.auth.vkUser,
            launchParams
        )

        await dispatch({
            type: SET_TOKEN,
            payload: {
                ...token,
            },
        })

        dispatch(fetchUser())
    } catch (e) {
        if (e?.response?.status === 404) {
            await dispatch(register(launchParams))
        } else {
            await dispatch({
                type: FAIL_USER,
                payload: console.error(e),
            })
        }
    }
}

const register = (launchParams) => async (dispatch, getState) => {
    await dispatch({
        type: REQUEST_USER,
    })

    try {
        const phoneData = await bridge.send("VKWebAppGetPhoneNumber", {})

        const state = getState()

        const token = await registerWithVkUser(
            state.auth.vkUser,
            phoneData,
            launchParams
        )

        await dispatch({
            type: SET_TOKEN,
            payload: {
                ...token,
            },
        })

        dispatch(fetchUser())
    } catch (e) {
        await dispatch({
            type: FAIL_USER,
            payload: console.error(e),
        })
    }
}

const fetchUser = () => async (dispatch) => {
    await dispatch({
        type: REQUEST_USER,
    })

    try {
        const user = await fetchMe()

        await dispatch({
            type: SUCCESS_USER,
            payload: {
                ...user,
            },
        })
    } catch (e) {
        await dispatch({
            type: FAIL_USER,
            payload: console.error(e),
        })
    }
}

export {
    getVkUser,
    login,
    register,
}