import { boot } from 'quasar/wrappers';
import { keycloak, initOptions } from '../modules/auth/services/keycloak';
import { useAuthStore } from '../stores/auth';

export default boot(async ({ app, router }) => {
  try {
    // NO limpiar parámetros antes de inicializar - Keycloak los necesita

    // Inicializar Keycloak PRIMERO
    const authenticated = await keycloak.init(initOptions);

    // DESPUÉS de la inicialización, limpiar parámetros
    cleanKeycloakParams();

    // Hacer Keycloak disponible globalmente
    app.config.globalProperties.$keycloak = keycloak;

    // Configurar store de autenticación
    const authStore = useAuthStore();

    if (authenticated) {
      authStore.setAuthenticated(true);
      authStore.setUser({
        username: keycloak.tokenParsed.preferred_username,
        email: keycloak.tokenParsed.email,
        name: keycloak.tokenParsed.name,
        roles: keycloak.tokenParsed.realm_access?.roles || [],
      });

      // Configurar renovación automática de token
      setupTokenRenewal();
    }

    // Configurar guards de navegación con verificación mejorada
    router.beforeEach((to, from, next) => {
      // Dar tiempo a que Keycloak procese completamente la inicialización
      setTimeout(() => {
        // Verificar autenticación de forma más robusta
        if (!keycloak.authenticated || !keycloak.token) {
          // Solo hacer login si no estamos ya en proceso de login
          const currentUrl = window.location.href;
          if (!currentUrl.includes('state=') && !currentUrl.includes('code=')) {
            keycloak.login({
              redirectUri: window.location.origin + window.location.pathname,
            });
          }
          return;
        }

        // Verificar roles si es necesario
        if (to.meta.roles && to.meta.roles.length > 0) {
          const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
          const hasRole = to.meta.roles.some((role) => userRoles.includes(role));

          if (!hasRole) {
            next('/unauthorized');
            return;
          }
        }

        next();
      }, 100); // Pequeño delay para asegurar que Keycloak ha terminado
    });
  } catch (error) {
    console.error('Error inicializando Keycloak:', error);
  }
});

// Función para renovación automática de tokens
function setupTokenRenewal() {
  // Renovar token cuando esté por expirar (30 segundos antes)
  setInterval(() => {
    keycloak
      .updateToken(30)
      .then((refreshed) => {
        if (refreshed) {
          console.log('Token renovado');
        }
      })
      .catch((error) => {
        console.error('Error renovando token:', error);
        // Si falla la renovación, hacer logout
        keycloak.logout();
      });
  }, 60000); // Verificar cada minuto
}

// Función para limpiar parámetros de Keycloak de la URL
function cleanKeycloakParams() {
  // Esperar un poco para asegurar que Keycloak ha procesado los parámetros
  setTimeout(() => {
    const url = new URL(window.location.href);

    // Solo limpiar si hay parámetros de Keycloak
    if (
      url.searchParams.has('state') ||
      url.searchParams.has('session_state') ||
      url.searchParams.has('code')
    ) {
      // Eliminar parámetros de Keycloak
      url.searchParams.delete('state');
      url.searchParams.delete('session_state');
      url.searchParams.delete('code');
      url.searchParams.delete('iss');

      // Mantener el hash de Vue Router si existe
      const newUrl = url.origin + url.pathname + (url.hash || '#/');

      // Actualizar URL sin recargar la página
      window.history.replaceState(null, '', newUrl);
    }
  }, 500); // Delay más largo para dar tiempo a Keycloak
}
