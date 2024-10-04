<template>
  <div class="code-showcase__container">
    <!-- Description slot (before the code) -->
    <div class="code-showcase__description">
      <slot name="description"></slot>
    </div>

    <!-- Button group for switching between languages -->
    <div v-if="languages.length > 1" class="code-showcase__tab-buttons">
      <button
          v-for="(language, index) in languages"
          :key="index"
          :class="['code-showcase__tab-button', { active: currentTab === index }]"
          @click="currentTab = index"
      >
        {{ language.label }}
      </button>
    </div>

    <div class="code-showcase__content-container">
      <!-- Code content based on selected tab -->
      <div class="code-showcase__content">
        <pre><code>{{ languages[currentTab].code }}</code></pre>
      </div>

      <!-- Copy to clipboard button -->
      <button class="code-showcase__copy-button" @click="copyCode">
        Copy Code
      </button>
    </div>

    <!-- Notes slot (after the code) -->
    <div class="code-showcase__notes">
      <slot name="notes"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props for languages and code snippets
const props = defineProps({
  languages: {
    type: Array,
    required: true,
    default: () => [
      { label: 'HTML', code: '<h1>Hello, world!</h1>' },
      { label: 'CSS', code: 'h1 { color: red; }' },
      { label: 'JavaScript', code: 'console.log("Hello, world!");' }
    ]
  }
})

const emit = defineEmits(['copy'])

// Track the currently selected tab
const currentTab = ref(0)

// Copy the currently displayed code to the clipboard
const copyCode = () => {
  const code = props.languages[currentTab.value].code
  navigator.clipboard.writeText(code).then(() => {
    emit('copy');
  })
}
</script>

<style scoped>
.code-showcase__container {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.code-showcase__description,
.code-showcase__notes {
  margin: 16px 0 8px;
  font-size: 14px;
  color: #333;
}

.code-showcase__tab-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.code-showcase__tab-button {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.code-showcase__tab-button:hover {
  background-color: #ddd;
}

.code-showcase__tab-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.code-showcase__content {
  background-color: #272822;
  padding: 16px;
  border-radius: 4px;
  color: #f8f8f2;
  font-family: monospace;
  white-space: pre-wrap;
}

.code-showcase__copy-button {
  position: absolute;
  right: 8px;
  top: 8px;
  opacity: 0.7;
  background: transparent;
  border: 1px solid white;
  padding: 2px 5px;
  margin: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.code-showcase__copy-button:hover {
  opacity: 1;
}

.code-showcase__content-container {
  background-color: #272822;
  padding: 16px 16px 8px;
  border-radius: 4px;
  color: #f8f8f2;
  font-family: monospace;
  white-space: pre-wrap;
  position: relative;
}
</style>
