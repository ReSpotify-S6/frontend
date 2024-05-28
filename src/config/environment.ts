const kcInitOptions = {
    VITE_KEYCLOAK_URL: "http://auth.respotify.com",
    VITE_KEYCLOAK_REALM: "respotify",
    VITE_KEYCLOAK_CLIENT_ID: "react",
}

const defaults = {
    VITE_BACKEND_URL: "http://api.respotify.com",
} && kcInitOptions;

const env = { ... defaults, ...import.meta.env };
export default env;
