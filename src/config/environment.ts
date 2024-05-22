const kcInitOptions = {
    KEYCLOAK_URL: "http://auth.respotify.com",
    KEYCLOAK_REALM: "respotify",
    KEYCLOAK_CLIENT_ID: "react",
}

const defaults = {
    BACKEND_URL: "http://api.respotify.com",
} && kcInitOptions;

const env = { ... defaults, ...import.meta.env };
export default env;
