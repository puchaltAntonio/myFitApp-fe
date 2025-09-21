<template>
  <q-page class="flex column">
    <!-- Header -->

    <HeaderComponent>
      <template #middle>
        <q-toolbar-title>Entrenamiento</q-toolbar-title>
      </template>

      <template #right>
        <q-btn flat round dense icon="sync" />
      </template>
    </HeaderComponent>

    <!-- Inicio Rápido -->

    <div class="flex column q-pa-lg">
      <span class="text-h10">Inicio Rápido</span>
      <q-btn class="q-mt-md" color="dark" label="Iniciar entrenamiento vacío" icon="add" />
    </div>

    <!-- Rutinas y Botones -->

    <div class="flex column q-pa-lg">
      <div class="flex row">
        <span class="col flex text-h10 text-bold">Rutinas</span>
        <q-btn flat round dense icon="create_new_folder" />
      </div>

      <div class="flex row justify-between">
        <q-btn color="dark" label="Nueva Rutina" icon="assignment" />
        <q-btn color="dark" label="Explorar" icon="search" />
      </div>
    </div>

    <!-- TODO: add number of workouts in folder -->
    <!-- Carpetas de rutinas  -->
    <div class="q-pa-md" style="max-width: 350px">
      <q-list padding>
        <q-expansion-item
          v-for="folder in workoutPreviewListByFolder"
          :key="folder.folder"
          v-bind="folder"
          :label="folder.folder"
          hide-expand-icon
        >
          <template #header>
            <q-item class="full-width">
              <q-item-section>
                <q-item-label>{{ folder.folder }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <BottomSheetButton
                  :message="folder.folder"
                  :actions="actions"
                  btnText=""
                  btnIcon="more_horiz"
                />
              </q-item-section>
            </q-item>
          </template>
          <div class="column q-gutter-md">
            <WorkoutCard
              v-for="(workoutPreview, index) in folder.workoutPreviewList"
              :key="workoutPreview.name"
              v-bind="workoutPreview"
              :class="{ 'q-mb-lg': index === folder.workoutPreviewList.length - 1 }"
            />
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HeaderComponent from 'src/modules/common/components/HeaderComponent.vue';

import WorkoutCard from '../components/WorkoutCard.vue';
import { workoutPreviewListByFolder } from 'src/modules/common/mock/mock-data';
import BottomSheetButton from '../../common/components/BottomSheetButton.vue';
import type { Action } from '../../common/components/BottomSheetButton.vue';

const actions: Action[] = [
  {
    label: 'Compartir Carpeta',
    icon: 'share',
    id: 'share',
  },
  {
    label: 'Reordenar Carpetas',
    icon: 'import_export',
    id: 'reorder',
  },
  {
    label: 'Renombrar Carpeta',
    icon: 'edit',
    id: 'rename',
  },
  {
    label: 'Agregar Nueva Rutina',
    icon: 'add',
    id: 'addWorkout',
  },
  {
    label: 'Eliminar Carpeta',
    icon: 'delete_forever',
    id: 'delete',
  },
];
</script>
