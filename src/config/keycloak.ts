import Keycloak from "keycloak-js";
import env from "./environment";

const keycloak = new Keycloak({
    realm: env.VITE_KEYCLOAK_REALM,
    url: env.VITE_KEYCLOAK_URL,
    clientId: env.VITE_KEYCLOAK_CLIENT_ID,
});
export default keycloak;
