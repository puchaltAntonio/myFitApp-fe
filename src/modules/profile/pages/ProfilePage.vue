<template>
  <q-page class="q-pa-lg">
    <HeaderComponent>
      <template #left>
        <router-link to="/editProfile">Editar Perfil</router-link>
      </template>
      <template #middle>
        <q-toolbar-title>{{ (authStore.getUser as any)?.name || 'Invitado' }}</q-toolbar-title>
      </template>
      <template #right>
        <q-btn flat round dense icon="share" />
        <q-btn flat round dense icon="settings" />
      </template>
    </HeaderComponent>

    <!-- Profile Basic Info Section -->
    <div class="row q-mb-md">
      <q-avatar col size="90px" font-size="48px" color="primary" text-color="white">
        {{ (authStore.getUser as any)?.name.charAt(0) || 'I' }}</q-avatar
      >
      <div class="col q-ml-lg">
        <p class="text-h6 q-mb-sm">{{ (authStore.getUser as any)?.name || 'Invitado' }}</p>

        <div class="row justify-between q-col-gutter-md">
          <div class="column items-center">
            <p>Entreno</p>
            222
          </div>
          <div class="column items-center">
            <p>Seguidores</p>
            222
          </div>
          <div class="column items-center">
            <p>Siguiendo</p>
            222
          </div>
        </div>
      </div>
    </div>

    <!-- Graphic Section -->
    <div class="col q-ma-md">
      <div class="row items-center q-mb-md justify-between">
        <div class="col col-4 self-center">45 mins esta semana</div>
        <!--  TODO: center actions test, no icon  -->
        <BottomSheetButton
          class="col col-4"
          message=""
          :actions="actions"
          btn-text="Order By"
          btn-icon=""
        />
      </div>
      <!-- TODO: All chart thing -->
      <q-card flat class="full-width bg-transparent">
        <q-card-section class="q-pa-sm">
          <apexchart
            class="full-width"
            height="100%"
            type="bar"
            :options="options"
            :series="series"
          />
        </q-card-section>
      </q-card>
      <div class="row items-center q-ma-md justify-between">
        <q-btn unelevated no-caps rounded dense color="primary">Duración</q-btn>
        <q-btn unelevated no-caps rounded dense color="primary">Volumen</q-btn>
        <q-btn unelevated no-caps rounded dense color="primary">Repeticiones</q-btn>
      </div>
    </div>

    <!-- 4 Information buttons TODO: Fix button style -->
    <q-card flat dark class="bg-transparent">
      <span class="text-weight-thin">Información</span>
      <div class="row items-center q-ma-md justify-between">
        <q-btn
          icon="area_chart"
          label="Estadísticas"
          unelevated
          no-caps
          dense
          outline
          color="primary"
        />
        <q-btn
          icon="fitness_center"
          label="Ejercicios"
          unelevated
          no-caps
          dense
          outline
          color="primary"
        />
      </div>
      <div class="row items-center q-ma-md justify-between">
        <q-btn
          icon="accessibility"
          label="Medidas"
          unelevated
          no-caps
          dense
          outline
          color="primary"
        />
        <q-btn
          icon="calendar_month"
          label="Calendario"
          unelevated
          no-caps
          outline
          dense
          color="primary"
        />
      </div>
    </q-card>

    <!-- Entrenamientos section infinite scroll -->
    <q-card flat dark class="bg-transparent">
      <span class="text-weight-thin">Entrenamientos</span>
      <div class="q-pa-md q-mt-md">
        <q-infinite-scroll @load="onLoad" :offset="250">
          <WorkoutSessionPreviewCard
            v-for="w in workoutArray"
            :key="w.name"
            v-bind="w"
            :name="(authStore.getUser as any)?.name"
            date="21/09/2025"
            :workout-session-preview="w"
          />
          <!-- <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template> -->
        </q-infinite-scroll>
      </div>
    </q-card>
    <div>
      <q-btn @click="logout">Logout</q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HeaderComponent from 'src/modules/common/components/HeaderComponent.vue';
import { useAuthStore } from 'src/stores/auth';
import BottomSheetButton from '../../common/components/BottomSheetButton.vue';
import type { Action } from '../../common/components/BottomSheetButton.vue';
import { ref } from 'vue';
import WorkoutSessionPreviewCard from '../components/WorkoutSessionPreviewCard.vue';
import { workoutArray, options, series } from 'src/modules/common/mock/mock-data';

//TODO: Review this and remove
const items = ref([{}, {}, {}, {}, {}, {}, {}]);
const onLoad = (index: number, done: (stop?: boolean) => void) => {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {});
    done(); // call done(true) if no more data
  }, 2000);
};

const authStore = useAuthStore();
const actions: Action[] = [
  {
    label: 'Últimos 3 meses',
    icon: '',
    id: 'month',
  },
  {
    label: 'Año',
    icon: '',
    id: 'year',
  },
  {
    label: 'Todo el tiempo',
    icon: '',
    id: 'allTime',
  },
];
//TODO: Remove Logout
const logout = () => {
  void authStore.logout();
};
</script>
