<template>
  <q-page class="flex column">
    <HeaderComponent>
      <template #left>
        <router-link to="/editProfile">Editar Perfil</router-link>
      </template>
      <template #middle>
        <q-toolbar-title>Nombre Usuario</q-toolbar-title>
      </template>
      <template #right>
        <q-btn flat round dense icon="share" />
        <q-btn flat round dense icon="settings" />
      </template>
    </HeaderComponent>

    <h1>Profile</h1>
    <p>Welcome to your Profile!</p>
  </q-page>
</template>

<script setup lang="ts">
import HeaderComponent from 'src/modules/common/components/HeaderComponent.vue';
</script>
