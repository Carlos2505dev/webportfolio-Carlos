<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useSeoMeta, useI18n } from '#imports';

const { t } = useI18n()

useSeoMeta({
    title: () => t('seo.title'),
    ogTitle: () => t('seo.title'),
    description: () => t('seo.description'),
    ogDescription: () => t('seo.description'),
    keywords: () => t('seo.keywords'),
    ogImage: '/images/avatar_website.png',
    twitterCard: 'summary_large_image',
    ogType: 'website',
    author: 'Carlos Neto',
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
