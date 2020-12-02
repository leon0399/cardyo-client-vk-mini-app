import {
    REQUEST_USER,
    SUCCESS_USER,
    FAIL_USER,

    REQUEST_VK_USER,
    SUCCESS_VK_USER,
    FAIL_VK_USER,

    SET_TOKEN,
} from '../types'

const initialState = {
    loading: true,

    vkUser: null,
    user: null,
    loggedIn: false,

    token: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                loggedIn: true,
                token: action.payload,
            }

        case REQUEST_USER:
            return {
                ...state,
                loading: true,
            }
        case SUCCESS_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case FAIL_USER:
            return {
                ...state,
                loading: false,
            }

        case REQUEST_VK_USER:
            return {
                ...state,
                loading: true,
            }
        case SUCCESS_VK_USER:
            return {
                ...state,
                vkUser: action.payload,
                loading: false,
            }
        case FAIL_VK_USER:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default authReducer