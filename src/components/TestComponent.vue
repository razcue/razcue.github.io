<template>
  <VContainer>
    <v-rating
        hover
        :length="5"
        :size="32"
        :model-value="3"
        active-color="primary"
    />
  </VContainer>
</template>

<script setup>
import { VRating } from 'vuetify/components'
import { ref } from 'vue'

const rating = ref(4)
</script>
