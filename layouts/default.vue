<template>
    <div class="body-container">
        <!-- Reading progress bar -->
        <div 
            v-show="!isModalOpen"
            class="reading-progress" 
            :style="{ '--progress': scrollProgress + '%' }"
            role="progressbar"
            :aria-valuenow="Math.round(scrollProgress)"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Reading progress"
        />
        <TheHeader />
        <main>
            <slot />
        </main>
        <TheFooter />
        <AppChatbot />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()

/* Hide progress bar when portfolio detail modal is open */
const isModalOpen = computed(() => !!route.query.project)

const scrollProgress = ref(0)

function updateProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateProgress)
})
</script>

<style scoped lang="scss">
.body-container{
    min-height: 100%;
}

.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--progress);
    height: 3px;
    background: linear-gradient(
        90deg,
        var(--primary_dark),
        var(--primary),
        var(--primary_dark)
    );
    background-size: 200% auto;
    animation: shimmer 2s ease-in-out infinite;
    z-index: 1000;
    transition: width 100ms ease-out;
    
    /* Glow effect */
    box-shadow: 
        0 0 6px var(--primary),
        0 0 20px rgba(138, 237, 19, 0.2);
    
    @keyframes shimmer {
        0%, 100% { background-position: 0% center; }
        50% { background-position: 100% center; }
    }
    
    @media (prefers-reduced-motion: reduce) {
        transition: none;
        animation: none;
    }
}
</style>