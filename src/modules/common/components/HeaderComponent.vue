<template>
  <q-header class="bg-grey-9">
    <!-- TODO: Fix postion -->
    <q-toolbar>
      <div class="col flex justify-start">
        <slot name="left"></slot>
      </div>
      <div class="col-auto flex justify-center">
        <slot name="middle"></slot>
      </div>
      <div class="col flex justify-end">
        <slot name="right"></slot>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { Dark } from 'quasar';

Dark.set(true);
</script>
