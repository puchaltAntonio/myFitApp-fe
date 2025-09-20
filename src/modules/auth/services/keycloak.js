import Keycloak from 'keycloak-js';

// Configuración de Keycloak
const keycloakConfig = {
  url: getKeycloakUrl(), // Servidor Keycloak
  realm: 'my-fit-app-dev-realm',
  clientId: 'my-fit-app-fe-dev-client',
};

// Función para determinar la URL de Keycloak según el dispositivo
function getKeycloakUrl() {
  const hostname = window.location.hostname;

  // Si estamos en localhost, usar localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:7000';
  }

  // Si estamos en una IP de red, usar la misma IP para Keycloak
  if (
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.')
  ) {
    return `http://${hostname}:7000`;
  }

  // Fallback
  return 'http://localhost:7000';
}

// Inicializar Keycloak
const keycloak = new Keycloak(keycloakConfig);

// Opciones de inicialización
const initOptions = {
  onLoad: 'login-required', // Forzar login automáticamente
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  checkLoginIframe: false, // Desactivar para desarrollo local
  flow: 'standard',
  responseMode: 'query', // Cambiar a query para evitar problemas con fragmentos
};

export { keycloak, initOptions };
