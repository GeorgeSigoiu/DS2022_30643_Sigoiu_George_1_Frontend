
export const TOKENS_EXPIRED = "tokens expired"

export async function requestHandler(requestToCall, args, tokens, setTokens) {
    try {
        const data = await requestToCall(args.link, tokens[0], args.payload)
        return data
    } catch (exception) {
        if (isTokenExpiredError(exception)) {
            const response = await tryRefreshTokens(tokens[1])
            if (response !== false) {
                const access_token = response.access_token
                const refresh_token = response.refresh_token
                const newTokens = [access_token, refresh_token]
                setTokens(newTokens)

            } else {
                navigate("/login?sesion_expired")
            }
        } else {
            alert(exception)
        }
    }
}