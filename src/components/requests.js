import axios from "axios"

export const LINK_GET_USERS = "http://localhost:7900/get/users"
export const LINK_ADD_USER = "http://localhost:7900/add/user"
export const LINK_REFRESH_TOKEN = "http://localhost:7900/token/refresh"
export const LINK_ADD_CREDENTIALS = "http://localhost:7900/add/credentials"
export const LINK_LOGIN = "http://localhost:7900/login"

export async function getRequest(link, access_token) {

    // axios.defaults.headers.common["Authorization"] = "Bearer ceva"
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    const response = await axios.get(link, {
        headers: {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then((response) => response.data)
        .then((data) => {
            return data
        })
    return response
}

