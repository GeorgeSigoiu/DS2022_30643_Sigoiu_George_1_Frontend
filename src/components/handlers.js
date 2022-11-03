import { isTokenExpiredError, tryRefreshTokens } from "./requests"

export const TOKENS_EXPIRED = "tokens expired"

export async function requestHandler(requestToCall, args) {
    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")
    try {
        const data = await requestToCall(args.link, access_token, args.payload)
        return data
    } catch (exception) {
        if (isTokenExpiredError(exception)) {
            const response = await tryRefreshTokens(refresh_token)
            if (response !== false) {
                const new_access_token = response.access_token
                const new_refresh_token = response.refresh_token
                localStorage.setItem("access_token", new_access_token)
                localStorage.setItem("refresh_token", new_refresh_token)

                try {
                    const data = await requestToCall(args.link, new_access_token, args.payload)
                    return data
                } catch (exp) {
                    if (isTokenExpiredError(exp)) {
                        window.location.href = "/login?session_expired"
                        //navigate("/login?sesion_expired")
                    } else {
                        alert(exp)
                    }
                }
            } else {
                window.location.href = "/login?session_expired"
                // navigate("/login?sesion_expired")
            }
        } else {
            console.log(exception)
        }
    }
}