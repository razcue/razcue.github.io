<template>
  <VRow justify="center">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <VRow align="center" justify="center">
          <VCol class="d-flex flex-column flex-lg-row align-center justify-center gap-4">
            <div class="position-relative">
              <VFab icon="mdi-github" size="40" class="repository-button" href="https://github.com/razcue/razcue.github.io"></VFab>
              <VAvatar size="120" class="mb-4">
                <img src="../assets/profile_pic.png" class="profile__pic" alt="Profile Picture">
              </VAvatar>
            </div>
            <div>
              <div class="text-h4">Rayko Azcue Pérez</div>
              <div class="text-h6 text--secondary mb-4">Software Engineer | Web Developer</div>
            </div>
          </VCol>
        </VRow>
        <VRow>
          <Marquee :speed="40" :width="'90%'" class="mb-4" start-centered>
            <div class="quote">
              <span class="quote__text">"Tell me and I forget, teach me and I may remember, involve me and I learn."</span>
              <span class="quote__author">Benjamin Franklin</span>
            </div>
          </Marquee>
        </VRow>
        <VRow class="mt-0">
          <div class="text-subtitle-1 px-2">
            Accomplished and results-driven web developer with over 5 years of experience creating dynamic, scalable,
            and high-performance web applications. Skilled in building reusable components, optimizing core functionalities,
            and delivering tailored solutions that align with business needs. Proven expertise in driving projects
            from concept to completion with a strong focus on clean code, best practices, and a collaborative approach to problem-solving.
          </div>
        </VRow>
        <VRow class="mt-6 align-center flex-column">
          <div class="separator" />

          <VRow class="mt-0 flex-column flex-lg-row align-start justify-start gap-lg-4">
            <VCol class="d-flex gap-2">
              <VIcon left>mdi-whatsapp</VIcon>
              <a href="https://wa.me/+5354761244" target="_blank">+5354761244</a>
            </VCol>
            <VCol class="d-flex gap-2">
              <VIcon left>mdi-chat-outline</VIcon>
              <a href="https://t.me/razcue" target="_blank">@razcue</a>
            </VCol>
            <VCol class="d-flex gap-2">
              <VIcon left>mdi-email-outline</VIcon>
              <a href="mailto:razcue@yandex.com" target="_blank">razcue@yandex.com</a>
            </VCol>
          </VRow>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.text--secondary {
  color: #757575;
}

.profile__pic {
  width: 140px;
  padding: 30px 0 0 10px;
}

.gap-2 {
  gap: 0.4rem;
}

.gap-4 {
  gap: 1rem;
}

.quote {
  display: flex;
  gap: 1rem;
}

.quote__author {
  font-weight: bold;
}

.quote__text {
  font-style: italic;
}

.separator {
  height: 0.1rem;
  width: 80%;
  background-color: #90a4ae;
}

.position-relative {
  position: relative !important;
}

.repository-button {
  position: absolute;
  height: inherit;
  top: 98px;
  left: 82px;
  z-index: 10;
}

@media (min-width: 1280px) {
  .gap-lg-4 {
    gap: 1rem;
  }
}
</style>
<script setup lang="ts">
import Marquee from "@/components/Marquee.vue";
</script>