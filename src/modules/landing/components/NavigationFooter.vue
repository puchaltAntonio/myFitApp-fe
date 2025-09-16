<template>
  <q-footer class="bg-grey-9 text-white">
    <q-tabs v-model="tab" dense align="justify" class="text-primary">
      <q-route-tab
        v-for="link in props.links"
        :key="link.title"
        v-bind="link"
        :name="link.title"
        :icon="link.icon"
        :label="link.title"
        :to="link.link"
      >
      </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NavigationLink } from '../interfaces/navigation-links.interface';

const tab = ref('home');

const props = defineProps<{
  links: NavigationLink[];
}>();
</script>
