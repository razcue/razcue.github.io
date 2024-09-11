<template>
  <div class="marquee-container" :style="marqueeContainerStyle">
    <div class="marquee-content" :style="marqueeContentStyle">
      <slot></slot> <!-- You can pass text or any content here -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Define props to control speed and direction
const props = defineProps({
  speed: {
    type: Number,
    default: 10
  }, // Higher number means slower
  direction: {
    type: String,
    default: 'left'
  }, // 'left' or 'right'
  width: {
    type: String,
    default: '100%', // default width of the container
  },
})

// Computed style to apply based on speed and direction
const marqueeContentStyle = computed(() => ({
  animationDuration: `${props.speed}s`,
  animationDirection: props.direction === 'right' ? 'reverse' : 'normal',
  paddingLeft: props.direction === 'off-screen' ? '100%' : 'normal',
}))

// Computed style to apply based on speed and direction
const marqueeContainerStyle = computed(() => ({
  width: props.width, // Set container width
}))
</script>

<style scoped>
/* Container should have a fixed width and overflow hidden */
.marquee-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  width: 100%; /* You can customize this width */
}

/* Content will move with a CSS animation */
.marquee-content {
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%; /* Start off-screen */
  animation-name: scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Animation to scroll from right to left */
@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
