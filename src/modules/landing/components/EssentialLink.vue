<template>
  <q-item clickable tag="a" target="_blank" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { NavigationLink } from '../interfaces/navigation-links.interface';

const props = withDefaults(defineProps<NavigationLink>(), {
  title: '',
  link: '#',
  icon: '',
});

const router = useRouter();
const navigateTo = async () => {
  if (props.link.startsWith('http')) {
    window.open(props.link, '_blank');
  } else {
    await router.push({ name: props.link });
  }
};
</script>
