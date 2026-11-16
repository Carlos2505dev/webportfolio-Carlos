<template>
    <div>
        <HomeHero id="home" />

        <HomePortfolio id="portfolio" :projects="latestWorks" />

        <HomeClients />

        <HomeAboutMe id="about" />

        <HomeServices id="services" />

        <HomeFaq />

        <HomeTestimonials />

        <HomeContact id="contact" />

        <button
            class="swarm-toggle"
            type="button"
            data-swarm-toggle
            aria-label="Ver os Agentes Construindo"
        >
            <AppIcon IconName="ph:cursor-bold" />
            <span>Ver os Agentes Construindo</span>
        </button>
    </div>
</template>

<script setup>
import { useI18n, useHead, useSeoMeta } from '#imports'
const { t, locale } = useI18n()
useHead({
    htmlAttrs: {
        lang: locale
    }
})
useSeoMeta({
    title: () => t('seo.title_home'),
    description: () => t('seo.description_home'),
    ogTitle: () => t('seo.title_home'),
    ogDescription: () => t('seo.description_home')
})

import HomeTestimonials from '@/components/HomeTestimonials.vue'
import portfolio from '@/localData/portfolio'

const latestWorks = portfolio

</script>

<style scoped lang="scss">
.swarm-toggle {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid var(--text_color_transparent);
    border-radius: 999px;
    background: var(--bg_color_transparent);
    backdrop-filter: blur(8px);
    color: var(--text_color);
    font-family: $font_secondary;
    font-size: $size_14px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    box-shadow: 0 8px 24px var(--shadow);
    transition: $transition_default;

    &:hover,
    &:focus-visible {
        border-color: var(--primary);
        color: var(--primary);
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 3px;
    }

    @media (max-width: $br_mobile) {
        right: 16px;
        bottom: 16px;
        padding: 10px 12px;
        font-size: $size_12px;
    }
}
</style>