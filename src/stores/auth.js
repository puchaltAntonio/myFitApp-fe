import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { keycloak } from '../modules/auth/services/keycloak';

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false);
  const user = ref(null);
  const loading = ref(false);

  // Getters
  const getUser = computed(() => user.value);
  const isLoggedIn = computed(() => isAuthenticated.value);
  const hasRole = computed(() => (role) => {
    return user.value?.roles?.includes(role) || false;
  });

  // Actions
  const setAuthenticated = (status) => {
    isAuthenticated.value = status;
  };

  const setUser = (userData) => {
    user.value = userData;
  };

  const login = async () => {
    // Esta función ya no es necesaria ya que se maneja automáticamente
    // pero la mantenemos por compatibilidad
    await keycloak.login({
      redirectUri: window.location.origin,
    });
  };

  const logout = async () => {
    loading.value = true;
    try {
      setAuthenticated(false);
      setUser(null);

      // Método más explícito
      const logoutUrl = keycloak.createLogoutUrl({
        redirectUri: window.location.origin + '/',
      });

      // Redirección manual
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Error en logout:', error);
      // Fallback: limpiar todo y redirigir
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = window.location.origin + '/';
    } finally {
      loading.value = false;
    }
  };

  const refreshUser = async () => {
    if (keycloak.authenticated && keycloak.tokenParsed) {
      setUser({
        username: keycloak.tokenParsed.preferred_username,
        email: keycloak.tokenParsed.email,
        name: keycloak.tokenParsed.name,
        roles: keycloak.tokenParsed.realm_access?.roles || [],
      });
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    getUser,
    isLoggedIn,
    hasRole,
    setAuthenticated,
    setUser,
    login,
    logout,
    refreshUser,
  };
});
