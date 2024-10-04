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

    <VSlideYTransition>
      <Portfolio />
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

<!--  Checkout LICENSE file at https://github.com/razcue/razcue.github.io/blob/master/LICENSE -->
<!--  <LicenseFooter />-->
</template>

<script setup lang="ts">
import ProfileHead from './components/ProfileHead.vue'
import ProfileSkills from './components/ProfileSkills.vue'
import ProfileExperienceEducation from './components/ProfileExperienceEducation.vue'
import { ref, nextTick, provide } from 'vue'
import Portfolio from "@/components/Portfolio.vue";

// Checkout LICENSE file at https://github.com/razcue/razcue.github.io/blob/master/LICENSE
// import LicenseFooter from "@/components/LicenseFooter.vue";

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

provide('Snackbar:giveMeASnack', throwSnack)
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
