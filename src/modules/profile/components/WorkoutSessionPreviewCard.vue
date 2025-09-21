<template>
  <!-- TODO: Fix style and elements margin, padding etc -->
  <q-card class="q-gutter-xs q-mb-xl">
    <!-- User info and button -->
    <div class="row q-gutter-md">
      <q-avatar col size="50px" font-size="48px" color="primary" text-color="white">
        {{ props.name.charAt(0) || 'I' }}</q-avatar
      >
      <div class="col q-ml-lg">
        <p class="text-h6 q-mb-sm">
          {{ props.name || 'Invitado' }}
        </p>
        <span>{{ new Date().toISOString().split('T')[0] }}</span>
      </div>
      <BottomSheetButton message="" :actions="actions" btnText="" btnIcon="more_horiz" />
    </div>
    <!-- Workout Session info -->
    <div class="col">
      <span>{{ props.workoutSessionPreview.name }}</span>
      <div class="row">
        <div class="column">
          <span>Tiempo</span>
          <span>{{ props.workoutSessionPreview.duration }} min</span>
        </div>
        <div class="column">
          <span>Volumen</span>
          <span>{{ props.workoutSessionPreview.volume }} kg</span>
        </div>
      </div>
      <q-separator inset />

      <div
        v-for="workoutSession in props.workoutSessionPreview.exerciseList"
        :key="workoutSession.name"
        v-bind="workoutSession"
        class="row"
      >
        <q-avatar col size="50px" font-size="48px" color="primary" text-color="white">
          {{ workoutSession.img }}</q-avatar
        >
        <span>{{ workoutSession.name }}</span>
      </div>
    </div>

    <q-separator inset />
    <!-- Like comment share buttons-->
    <div>
      <div class="row">
        <q-btn icon="thumb_up_off_alt" unelevated dense outline flat />
        <q-btn icon="chat_bubble_outline" unelevated dense outline flat />
        <q-btn icon="share" unelevated dense outline flat />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import BottomSheetButton, {
  type Action,
} from 'src/modules/common/components/BottomSheetButton.vue';

const props = defineProps<{
  name: string;
  date: string;
  workoutSessionPreview: {
    name: string;
    duration: string;
    volume: string;
    exerciseList: {
      img: string;
      name: string;
    }[];
  };
}>();

const actions: Action[] = [
  {
    label: 'Compartir Entrenamiento',
    icon: 'share',
    id: 'share',
  },
  {
    label: 'Guardar Como Rutina',
    icon: 'save_alt',
    id: 'save',
  },
  {
    label: 'Copiar Entrenamiento',
    icon: 'content_copy',
    id: 'copy',
  },
  {
    label: 'Editar Entrenamiento',
    icon: 'edit',
    id: 'edit',
  },
  {
    label: 'Borrar Entrenamiento',
    icon: 'delete_forever',
    id: 'delete',
  },
];
</script>

<style scoped></style>
