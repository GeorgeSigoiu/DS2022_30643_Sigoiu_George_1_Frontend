import axios from "axios"

export const LINK_GET_USERS = "http://localhost:7900/get/users"
export const LINK_GET_CREDENTIALS_ID = "http://localhost:7900/get/credentials-id/user-id="
export const LINK_GET_CREDENTIALS = "http://localhost:7900/get/credentials-id/user-id="
export const LINK_GET_DEVICES = "http://localhost:7900/get/devices"
export const LINK_GET_DEVICES_WITHOUT_OWNER = "http://localhost:7900/get/devices/no-owner"

export const LINK_ADD_USER = "http://localhost:7900/add/user"
export const LINK_ADD_CREDENTIALS = "http://localhost:7900/add/credentials"
export const LINK_ADD_DEVICE = "http://localhost:7900/add/device"

export const LINK_DELETE_USER = "http://localhost:7900/delete/user-id="
export const LINK_DELETE_DEVICE = "http://localhost:7900/delete/device-id="

export const LINK_PUT_USER = "http://localhost:7900/update/user-id="
export const LINK_PUT_CREDENTIALS = "http://localhost:7900/update/credentials-id="
export const LINK_PUT_DEVICE = "http://localhost:7900/update/device-id="

export const LINK_REFRESH_TOKEN = "http://localhost:7900/token/refresh"
export const LINK_LOGIN = "http://localhost:7900/login"


export async function getRequest(link, access_token) {

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

export async function putRequest(link, id, payload, access_token) {

    const response = await axios.put(link + id, JSON.stringify(payload), {
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
    return response
}

export async function postRequest(link, payload, access_token) {
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

export async function deleteRequest(link, entityId, access_token) {
    const response = await axios.delete(link + entityId, {
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

export async function insertDevice(device, access_token) {

}