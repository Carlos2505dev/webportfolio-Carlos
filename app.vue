<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
    title: 'Carlos Neto - Designer & Developer',
    ogTitle: 'Carlos Neto - Designer & Developer',
    description:
        "As a seasoned designer and frontend developer with over a decade of experience in the technology sector, I am dedicated to consistently delivering excellence to my clients. On my website, you will discover a portfolio showcasing projects I've had the privilege of working on, as well as an overview of the technology services I offer.",
    ogDescription:
        "As a seasoned designer and frontend developer with over a decade of experience in the technology sector, I am dedicated to consistently delivering excellence to my clients. On my website, you will discover a portfolio showcasing projects I've had the privilege of working on, as well as an overview of the technology services I offer.",
    ogImage: '/images/avatar_website.png',
    twitterCard: 'summary_large_image',
})
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
    transition: $transition_default;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    // filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
    transition: $transition_default;
}

.layout-enter-from,
.layout-leave-to {
    opacity: 0;
    // filter: blur(1rem);
}

.fade-enter-active,
.fade-leave-active {
    transition: $transition_default;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
