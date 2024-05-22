import Keycloak from "keycloak-js";
import env from "./environment";

const keycloak = new Keycloak({
    realm: env.KEYCLOAK_REALM,
    url: env.KEYCLOAK_URL,
    clientId: env.KEYCLOAK_CLIENT_ID,
});
export default keycloak;