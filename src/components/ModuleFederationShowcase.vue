<template>
  <VRow justify="center" class="mt-6">
    <VCol cols="12" md="8">
      <VCard elevation="3" class="pa-6">
        <div class="text-h5 mb-4">Module Federation</div>
        <div class="text-body-1 mb-4">
          Module Federation allows you to share code across different applications without requiring them to be bundled together. This is particularly useful for micro-frontends, where multiple applications can independently deploy, but share common components.
        </div>

        <CodeShowcase :languages="languages">
          <!-- Description Slot -->
          <template #description>
            This example shows how to implement a code snippet component with language tabs and a copy-to-clipboard button.
          </template>

          <!-- Notes Slot -->
          <template #notes>
            Note: This component is fully customizable and allows you to showcase code in various languages/technologies.
          </template>
        </CodeShowcase>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import CodeShowcase from "@/components/CodeShowcase.vue";

const languages = [
  { label: 'HTML', code: '<h1>Hello, world!</h1>' },
  { label: 'CSS', code: 'h1 { color: red; font-size: 2rem; }' },
  { label: 'JavaScript', code: 'console.log("Hello, world!");' }
]
</script>