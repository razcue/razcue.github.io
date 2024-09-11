<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <VRow>
          <!-- Soft Skills -->
          <VCol cols="12" md="6" class="mb-4">
            <div class="text-h6 mb-3">Soft Skills</div>
            <div class="d-flex flex-column align-center">
              <Marquee :speed="9" :width="'70%'">
                Analytical Thinking
              </Marquee>
              <Marquee :speed="10" :width="'80%'">
                Problem-Solving
              </Marquee>
              <Marquee :speed="20" :width="'50%'">
                Teamwork
              </Marquee>
              <Marquee :speed="20">
                Communication
              </Marquee>
              <Marquee :speed="20">
                Mentoring
              </Marquee>
              <Marquee :speed="20">
                <div class="d-flex justify-space-evenly w-100" style="gap: 40vw;">
                  <div>Agile Methodologies</div>
                  <div>KISS</div>
                </div>
              </Marquee>
            </div>
          </VCol>

          <!-- Technical Skills -->
          <VCol cols="12" md="6">
            <div class="text-h6 mb-3">Technical Skills</div>
            <VRow dense>
              <VCol cols="6">
                <VIcon left>mdi-laravel</VIcon> Laravel
                <VRating v-model="laravelRating" color="primary" />
              </VCol>
              <VCol cols="6">
                <VIcon left>mdi-vuejs</VIcon> Vue.js
                <VRating v-model="vueRating" color="primary" />
              </VCol>
              <VCol cols="6">
                <VIcon left>mdi-react</VIcon> React
                <VRating v-model="reactRating" color="primary" />
              </VCol>
              <VCol cols="6">
                <VIcon left>mdi-nodejs</VIcon> Node.js
                <VRating v-model="nodeRating" color="primary" />
              </VCol>
              <VCol cols="6">
                <VIcon left>mdi-database"></VIcon> SQL
                <VRating v-model="sqlRating" color="primary" />
              </VCol>
              <VCol cols="6">
                <VIcon left>mdi-language-javascript"></VIcon> JavaScript
                <VRating v-model="jsRating" color="primary" />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import Marquee from "./Marquee.vue";

const laravelRating = ref(4)
const vueRating = ref(5)
const reactRating = ref(3.5)
const nodeRating = ref(3)
const sqlRating = ref(4)
const jsRating = ref(5)
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}
</style>