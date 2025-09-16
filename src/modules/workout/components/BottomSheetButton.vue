<template>
  <q-btn flat round dense icon="more_horiz" @click.stop="show" />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

export interface Action {
  label: string;
  icon: string;
  id: string;
}

const props = defineProps<{
  message: string;
  actions: Action[];
}>();

const show = () => {
  $q.bottomSheet({
    class: 'flex column items-center q-pa-md',
    style:
      'border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 0; border-bottom-right-radius: 0;',
    message: props.message,
    actions: [{}, ...props.actions],
  });
};
</script>

<style scoped></style>
