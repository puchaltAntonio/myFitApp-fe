<template>
  <q-card flat class="bg-grey-9" style="border-radius: 15px">
    <q-card-section>
      <div class="flex column">
        <div class="flex row">
          <span class="col flex text-h10 text-bold">{{ name }}</span>
          <BottomSheetButton :message="name" :actions="actions" />
        </div>
        <span class="truncate-multi"> {{ exercisePreview }}</span>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn rounded class="full-width q-py-sm" color="primary">Empezar Rutina</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import BottomSheetButton from './BottomSheetButton.vue';
import type { Action } from './BottomSheetButton.vue';

defineProps<{
  name: string;
  exercisePreview: string;
}>();

const actions: Action[] = [
  {
    label: 'Compartir Rutina',
    icon: 'share',
    id: 'share',
  },
  {
    label: 'Duplicar Rutina',
    icon: 'content_copy',
    id: 'duplicate',
  },
  {
    label: 'Editar Rutina',
    icon: 'edit',
    id: 'edit',
  },
  {
    label: 'Borrar Rutina',
    icon: 'clear',
    id: 'delete',
  },
];
</script>

<style scoped>
.truncate-multi {
  display: -webkit-box; /* needed for webkit-based browsers */
  display: box; /* older spec */
  display: -moz-box; /* Firefox old (optional, mostly legacy) */

  overflow: hidden;

  -webkit-box-orient: vertical;
  box-orient: vertical;

  -webkit-line-clamp: 2; /* Safari / Chromium */
  line-clamp: 2;
}
</style>
