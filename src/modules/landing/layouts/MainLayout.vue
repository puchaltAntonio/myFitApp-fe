<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-if="!$q.screen.lt.md" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <NavigationFooter v-if="$q.screen.lt.md" :links="linksList" />
  </q-layout>
</template>

<script setup lang="ts">
import { linksList } from 'src/router/navigation-link-list';
import NavigationFooter from '../components/NavigationFooter.vue';
import EssentialLink from '../components/EssentialLink.vue';
import { Dark } from 'quasar';

Dark.set(true);
</script>
