import axios from "axios"
const baseUrl = "http://localhost:7900"
export const LINK_GET_USERS = baseUrl + "/get/users"
export const LINK_GET_USER = baseUrl + "/get/user-id="
export const LINK_GET_CREDENTIALS_ID = baseUrl + "/get/credentials-id/user-id="
export const LINK_GET_CREDENTIALS = baseUrl + "/get/credentials-id/user-id="
export const LINK_GET_DEVICES = baseUrl + "/get/devices"
export const LINK_GET_DEVICES_WITHOUT_OWNER = baseUrl + "/get/devices/no-owner"

export const LINK_ADD_USER = baseUrl + "/add/user"
export const LINK_ADD_CREDENTIALS = baseUrl + "/add/credentials"
export const LINK_ADD_DEVICE = baseUrl + "/add/device"

export const LINK_DELETE_USER = baseUrl + "/delete/user-id="
export const LINK_DELETE_DEVICE = baseUrl + "/delete/device-id="

export const LINK_PUT_USER = baseUrl + "/update/user-id="
export const LINK_PUT_CREDENTIALS = baseUrl + "/update/credentials-id="
export const LINK_PUT_DEVICE = baseUrl + "/update/device-id="
export const LINK_ADD_DEVICE_TO_USER = baseUrl + "/add/device=DEVICEID-to-user=USERID"
export const LINK_UPDATE_DEVICES_USER = baseUrl + "/update/devices/to-user="

export const LINK_LOGIN = baseUrl + "/login"
const LINK_REFRESH_TOKEN = baseUrl + "/token/refresh"


export async function getRequest(link, access_token, payload) {

    const response = await axios.get(link, {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    })
        .then((response) => response.data)
        .then((data) => {
            return data
        })
    return response
}

export async function putRequest(link, access_token, payload) {

    const response = await axios.put(link, JSON.stringify(payload), {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    })
        .then((response) => {
            return response
        })
    return response
}

export async function postRequest(link, access_token, payload) {
    const response = await axios.post(link, JSON.stringify(payload), {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    }).then((response) => { return response.data })
    return response
}

export async function deleteRequest(link, access_token, payload) {
    const response = await axios.delete(link, {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    })
    return response.status
}

export async function login(username, password) {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const response = await axios.post(LINK_LOGIN,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
            }
        })
        .then((response) => {
            return response.data
        })
    return response
}

export async function insertUser(user, access_token) {
    const credentials = {
        username: user.username,
        password: user.password
    }
    const newCredentials = await insertCredentials(credentials, access_token)
    console.log(newCredentials)
    const userToInsert = {
        credentials: newCredentials,
        name: user.name,
        role: user.role
    }
    console.log(userToInsert)
    const newUser = await axios.post(LINK_ADD_USER, userToInsert, {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    })
        .then((response) => {
            return response.data
        })
    return newUser
}

async function insertCredentials(credentials, access_token) {
    return await axios.post(LINK_ADD_CREDENTIALS, JSON.stringify(credentials), {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    })
        .then((response) => {
            return response.data
        })
}

async function deleteCredentials() {

}


export async function refreshToken(refresh_token) {
    const response = await axios.get(LINK_REFRESH_TOKEN, {
        headers: {
            "Authorization": "Bearer " + refresh_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        }
    }).then((response) => response.data)
        .then((response) => { return response })

    return response
}


// refresh token
export async function tryRefreshTokens(refresh_token) {
    try {
        const newTokens = await refreshToken(refresh_token)
        return newTokens
    } catch (exception) {
        if (isTokenExpiredError(exception)) {
            return false
        } else {
            throw exception
        }
    }

}

export function isTokenExpiredError(exception) {
    try {
        if (exception.response.data.error_message.startsWith("The Token has expired")) {
            return true
        }
        return false
    } catch (exception) {
        return false
    }
}