<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <div class="text-h5 mb-4">Contact Me</div>
        <VForm ref="form" v-model="valid" @submit.prevent="sendEmail">
          <VTextField
              v-model="formData.name"
              label="Your Name"
              required
              :rules="[v => !!v || 'Name is required']"
          />
          <VTextField
              v-model="formData.email"
              label="Your Email"
              type="email"
              required
              :rules="[v => !!v || 'Email is required']"
          />
          <VTextarea
              v-model="formData.message"
              label="Your Message"
              required
              :rules="[v => !!v || 'Message is required']"
          />
          <VBtn color="primary" type="submit">Send Message</VBtn>
        </VForm>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import * as emailjs from '@emailjs/browser'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const valid = ref(false)

const giveMeASnack = inject('Snackbar:giveMeASnack')

onMounted( () => {
  emailjs.init({
    publicKey: 'NHhHVmI1F6R9Kehj2',
    // Do not allow headless browsers
    blockHeadless: true,
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 1000,
    },
  });
})

const sendEmail = () => {
  if (valid.value) {
    emailjs.send(
        'service_6veeh4n',
        'template_rrhmqaf',
        formData.value
    ).then(() => {
      giveMeASnack({
        message: 'Message sent successfully.',
        color: 'success',
        timeout: 3000,
      })
      formData.value.name = ''
      formData.value.email = ''
      formData.value.message = ''
    }).catch(err => {
      giveMeASnack({
        message: 'Unable to send message!',
        color: 'error',
        timeout: 3000,
      })
    })
  }
}
</script>