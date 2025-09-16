<template>
  <HeaderComponent>
    <template #left>
      <q-btn-dropdown color="primary" label="Inicio" dropdown-icon="las la-angle-down">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Inicio</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Descubrir</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>

    <template #right>
      <q-btn flat round dense icon="search" />
      <q-btn flat round dense icon="notifications" />
    </template>
  </HeaderComponent>

  <q-page class="flex column">
    <h1>Home</h1>
    <p>Welcome to your fitness app!</p>
  </q-page>
</template>

<script setup lang="ts">
import HeaderComponent from 'src/modules/common/components/HeaderComponent.vue';
</script>
