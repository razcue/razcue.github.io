<script setup lang="ts">
import { ref } from 'vue'
// import 'vuetify/styles'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h2 class="read-the-docs">{{ msg }}</h2>

  <div class="card">
    <VBtn @click="count++">count is {{ count }}</VBtn>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
