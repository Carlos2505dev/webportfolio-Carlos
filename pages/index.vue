<template>
    <div>
        <HomeHero id="home" />

        <HomePortfolio id="portfolio" :projects="latestWorks" />

        <HomeClients />

        <HomeAboutMe id="about" />

        <HomeServices id="services" />

        <HomeContact id="contact" />


    </div>
</template>

<script setup>
import { useI18n, useHead } from '#imports'
const { locale } = useI18n()
useHead({
    htmlAttrs: {
        lang: locale
    }
})

import portfolio from '@/localData/portfolio'

const latestWorks = portfolio



</script>