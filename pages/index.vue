<template>
    <div>
        <HomeHero id="home" />

        <HomePortfolio id="portfolio" :projects="latestWorks" />

        <HomeClients />

        <HomeAboutMe id="about" />

        <HomeServices id="services" />

        <HomeTestimonials />

        <HomeContact id="contact" />


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
    ogDescription: () => t('seo.description_home'),
})

import HomeTestimonials from '@/components/HomeTestimonials.vue'
import portfolio from '@/localData/portfolio'

const latestWorks = portfolio



</script>