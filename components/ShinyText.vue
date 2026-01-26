<template>
  <span
    ref="containerRef"
    :class="['shiny-text', className, { 'disabled': disabled }]"
    :style="combinedStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  text?: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  disabled: false,
  speed: 2,
  className: '',
  color: '#b5b5b5',
  shineColor: '#ffffff',
  spread: 120,
  yoyo: false,
  pauseOnHover: false,
  direction: 'left',
  delay: 0
});

const isPaused = ref(false);
const progress = ref(0);
const elapsed = ref(0);
const lastTime = ref<number | null>(null);
const directionSign = ref(props.direction === 'left' ? 1 : -1);

const animationDuration = computed(() => props.speed * 1000);
const delayDuration = computed(() => props.delay * 1000);

let rafId: number | null = null;

const animate = (time: number) => {
  if (props.disabled || isPaused.value) {
    lastTime.value = null;
    rafId = requestAnimationFrame(animate);
    return;
  }

  if (lastTime.value === null) {
    lastTime.value = time;
    rafId = requestAnimationFrame(animate);
    return;
  }

  const deltaTime = time - lastTime.value;
  lastTime.value = time;
  elapsed.value += deltaTime;

  if (props.yoyo) {
    const cycleDuration = animationDuration.value + delayDuration.value;
    const fullCycle = cycleDuration * 2;
    const cycleTime = elapsed.value % fullCycle;

    if (cycleTime < animationDuration.value) {
      const p = (cycleTime / animationDuration.value) * 100;
      progress.value = directionSign.value === 1 ? p : 100 - p;
    } else if (cycleTime < cycleDuration) {
      progress.value = directionSign.value === 1 ? 100 : 0;
    } else if (cycleTime < cycleDuration + animationDuration.value) {
      const reverseTime = cycleTime - cycleDuration;
      const p = 100 - (reverseTime / animationDuration.value) * 100;
      progress.value = directionSign.value === 1 ? p : 100 - p;
    } else {
      progress.value = directionSign.value === 1 ? 0 : 100;
    }
  } else {
    const cycleDuration = animationDuration.value + delayDuration.value;
    const cycleTime = elapsed.value % cycleDuration;

    if (cycleTime < animationDuration.value) {
      const p = (cycleTime / animationDuration.value) * 100;
      progress.value = directionSign.value === 1 ? p : 100 - p;
    } else {
      progress.value = directionSign.value === 1 ? 100 : 0;
    }
  }

  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

watch(() => props.direction, (newDir) => {
  directionSign.value = newDir === 'left' ? 1 : -1;
  elapsed.value = 0;
  progress.value = 0;
});

const backgroundPosition = computed(() => {
  const p = progress.value;
  return `${150 - p * 2}% center`;
});

const combinedStyle = computed(() => ({
  backgroundImage: `linear-gradient(${props.spread}deg, ${props.color} 0%, ${props.color} 35%, ${props.shineColor} 50%, ${props.color} 65%, ${props.color} 100%)`,
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundPosition: backgroundPosition.value,
}));

const handleMouseEnter = () => {
  if (props.pauseOnHover) isPaused.value = true;
};

const handleMouseLeave = () => {
  if (props.pauseOnHover) isPaused.value = false;
};
</script>

<style scoped>
.shiny-text {
  display: inline-block;
  cursor: inherit;
}
.shiny-text.disabled {
  background-clip: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: inherit;
  background-image: none;
}
</style>
