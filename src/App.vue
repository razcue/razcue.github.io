<script setup lang="ts">
import ProfileHead from './components/ProfileHead.vue'
import ProfileSkills from './components/ProfileSkills.vue'
import ProfileExperienceEducation from './components/ProfileExperienceEducation.vue'
import { ref, nextTick, provide } from 'vue'

const showSnackbar = ref(false)

type Anchor = 'top' | 'bottom' | 'top start' | 'top end' | 'bottom start' | 'bottom end'

const snackbarOptions = ref({
  message: '',
  variant: 'flat' as 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain', // Set the correct type for variant
  color: 'primary',
  timeout: 2000,
  location: 'top end' as Anchor,
  transition: 'fade-transition',
  showAction: false,
  actionText: 'Cerrar',
})

interface iSnackbarOptions {
  message?: string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' // Make sure variant has correct types
  color?: string
  timeout?: number
  location?: 'top' | 'bottom' | 'top end' | 'bottom end'
  transition?: string
  showAction?: boolean
  actionText?: string
}

const throwSnack = (options: iSnackbarOptions) => {
  snackbarOptions.value = {
    message: options.message || '',
    variant: options.variant || 'flat',
    color: options.color || 'primary',
    timeout: options.timeout || 2000,
    location: options.location || 'top end',
    transition: options.transition || 'fade-transition',
    showAction: options.showAction || false,
    actionText: options.actionText || 'Cerrar',
  }

  nextTick(() => {
    showSnackbar.value = true
  })
}

// Provide the throwSnack function to the rest of the app
provide('Snackbar:giveMeASnack', throwSnack)
</script>

<template>
  <VContainer fluid>
    <VSlideYTransition>
      <ProfileHead />
    </VSlideYTransition>

    <VSlideYTransition>
      <ProfileSkills />
    </VSlideYTransition>

    <VSlideYTransition>
      <ProfileExperienceEducation />
    </VSlideYTransition>

    <!-- Snackbar component -->
    <VSnackbar
      v-model="showSnackbar"
      :variant="snackbarOptions.variant"
      :color="snackbarOptions.color"
      :timeout="snackbarOptions.timeout"
      :location="snackbarOptions.location"
      :transition="snackbarOptions.transition"
    >
      {{ snackbarOptions.message }}
      <template v-if="snackbarOptions.showAction" #actions>
        <VBtn
          :color="snackbarOptions.color"
          @click="showSnackbar = false"
        >
        {{ snackbarOptions.actionText }}
        </VBtn>
      </template>
    </VSnackbar>
  </VContainer>
</template>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
