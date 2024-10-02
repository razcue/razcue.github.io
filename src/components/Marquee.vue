<template>
  <div class="marquee__pseudo-container">
    <div class="marquee__container" :style="marqueeContainerStyle">
      <div
        class="marquee__content"
        :style="marqueeContentStyle"
      >
        <slot></slot> <!-- You can pass text or any content here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  speed: {
    type: Number,
    default: 10 // Higher number means slower
  },
  width: {
    type: String,
    default: '100%', // default width of the container
  },
  startCentered: {
    type: Boolean,
    default: false, // start at the center
  },
  reverse: {
    type: Boolean,
    default: false, // alternate the animation direction
  },
  bounce: {
    type: Boolean,
    default: false, // alternate the animation direction cycle
  },
})

// Computed style to apply based on props
const marqueeContentStyle = computed(() => ({
  animationDuration: `${props.speed}s`,
  animationDirection: props.reverse
      ? (props.bounce ? 'alternate-reverse' : 'reverse')
      : (props.bounce ? 'alternate' : 'normal'),
  padding: props.startCentered
      ? '0 50%'
      : (props.reverse ? '0 0 0 100%' : '0 100% 0 0'),
  animationDelay: props.startCentered ? `-${props.speed/2}s` : '0',
}))

// Computed style to apply based on width
const marqueeContainerStyle = computed(() => ({
  width: props.width, // Set container width
}))
</script>

<style scoped>
.marquee__pseudo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.marquee__container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}

/* Content will move with a CSS animation */
.marquee__content {
  display: inline-block;
  white-space: nowrap;
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
