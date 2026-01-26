<template>
  <component
    :is="as"
    ref="containerRef"
    class="text-type"
    v-bind="$attrs"
  >
    <span class="text-type__content" :style="{ color: currentTextColor || 'inherit' }">
      {{ displayedText }}
    </span>
    <span
      v-if="showCursor"
      ref="cursorRef"
      :class="['text-type__cursor', cursorClassName, { 'text-type__cursor--hidden': shouldHideCursor }]"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { gsap } from 'gsap';

interface Props {
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: any;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  typingSpeed: 50,
  initialDelay: 0,
  pauseDuration: 2000,
  deletingSpeed: 30,
  loop: true,
  showCursor: true,
  hideCursorWhileTyping: false,
  cursorCharacter: '|',
  cursorClassName: '',
  cursorBlinkDuration: 0.5,
  textColors: () => [],
  startOnVisible: false,
  reverseMode: false,
});

const emit = defineEmits(['sentenceComplete']);

const displayedText = ref('');
const currentCharIndex = ref(0);
const isDeleting = ref(false);
const currentTextIndex = ref(0);
const isVisible = ref(!props.startOnVisible);
const cursorRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]));

const getRandomSpeed = () => {
  if (!props.variableSpeed) return props.typingSpeed;
  const { min, max } = props.variableSpeed;
  return Math.random() * (max - min) + min;
};

const currentTextColor = computed(() => {
  if (props.textColors.length === 0) return;
  return props.textColors[currentTextIndex.value % props.textColors.length];
});

let observer: IntersectionObserver | null = null;
let timeoutId: any = null;

const executeTypingAnimation = () => {
  if (!isVisible.value) return;

  const currentText = textArray.value[currentTextIndex.value];
  if (!currentText) return;
  
  const processedText = props.reverseMode ? currentText.split('').reverse().join('') : currentText;

  if (isDeleting.value) {
    if (displayedText.value === '') {
      isDeleting.value = false;
      if (currentTextIndex.value === textArray.value.length - 1 && !props.loop) {
        return;
      }

      emit('sentenceComplete', textArray.value[currentTextIndex.value], currentTextIndex.value);

      currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length;
      currentCharIndex.value = 0;
      timeoutId = setTimeout(executeTypingAnimation, 100);
    } else {
      timeoutId = setTimeout(() => {
        displayedText.value = displayedText.value.slice(0, -1);
        executeTypingAnimation();
      }, props.deletingSpeed);
    }
  } else {
    if (currentCharIndex.value < processedText.length) {
      timeoutId = setTimeout(
        () => {
          displayedText.value += processedText[currentCharIndex.value];
          currentCharIndex.value++;
          executeTypingAnimation();
        },
        props.variableSpeed ? getRandomSpeed() : props.typingSpeed
      );
    } else if (textArray.value.length >= 1) {
      if (!props.loop && currentTextIndex.value === textArray.value.length - 1) return;
      timeoutId = setTimeout(() => {
        isDeleting.value = true;
        executeTypingAnimation();
      }, props.pauseDuration);
    }
  }
};

const startAnimation = () => {
  clearTimeout(timeoutId);
  if (currentCharIndex.value === 0 && !isDeleting.value && displayedText.value === '') {
    timeoutId = setTimeout(executeTypingAnimation, props.initialDelay);
  } else {
    executeTypingAnimation();
  }
};

onMounted(() => {
  if (props.startOnVisible && containerRef.value) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.value);
  } else {
      isVisible.value = true;
  }

  if (props.showCursor && cursorRef.value) {
    gsap.set(cursorRef.value, { opacity: 1 });
    gsap.to(cursorRef.value, {
      opacity: 0,
      duration: props.cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }

  if (isVisible.value) {
      startAnimation();
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  clearTimeout(timeoutId);
});

watch(isVisible, (newVal) => {
  if (newVal) startAnimation();
});

const shouldHideCursor = computed(() => 
  props.hideCursorWhileTyping && (currentCharIndex.value < (textArray.value[currentTextIndex.value]?.length || 0) || isDeleting.value)
);
</script>

<style scoped>
.text-type {
  display: inline-block;
  white-space: pre-wrap;
}

.text-type__cursor {
  margin-left: 0.1rem;
  display: inline-block;
  opacity: 1;
  font-weight: 300;
  color: var(--primary);
  -webkit-text-fill-color: var(--primary);
}

.text-type__cursor--hidden {
  display: none;
}
</style>
