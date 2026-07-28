<template>
    <div>
        <section class="hero__section section">
            <div class="hero__section__container container">
                <h1 class="hero__section__container__title gradient-font">
                    {{ $t('portfolio_page.title') }}
                </h1>
                <p class="hero__section__container__subtitle" v-html="$t('portfolio_page.subtitle')" />
            </div>
        </section>

        <PortfolioList :projects="allProjects" />

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
    title: () => t('seo.title_portfolio'),
    description: () => t('seo.description_portfolio'),
    ogTitle: () => t('seo.title_portfolio'),
    ogDescription: () => t('seo.description_portfolio'),
})

import portfolio from '@/localData/portfolio'

const allProjects = portfolio

</script>

<style lang="scss" scoped>
.hero__section{
    display: grid;
    place-items: center;
    max-width: 100%;
    position: relative;
    padding-block: 180px 40px;
    &__container{
        width: 100%;
        text-align: center;
        &__title{
            margin-block: 4px;
            font-size: $size_72px;
            font-weight: 600;
            @media(max-width:$br_mobile){
                font-size: $size_60px;
            }
        }
        &__subtitle{
            max-width: 500px;
            margin-inline: auto;
            font-size: $size_20px;
        }
    }

}
</style>