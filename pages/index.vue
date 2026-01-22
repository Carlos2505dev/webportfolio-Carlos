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
import { useI18n, useHead, computed } from '#imports'
const { locale } = useI18n()
useHead({
    htmlAttrs: {
        lang: locale
    }
})

import portfolio from '@/localData/portfolio'

const latestWorks = computed(() => {
    const projects = portfolio[locale.value]
    const last8Items = projects.slice(-12)
    const reverseList = last8Items.reverse()
    return reverseList
})



</script>