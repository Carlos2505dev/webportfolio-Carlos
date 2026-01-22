<template>
    <div>
        <section class="hero__section section">
            <div v-if="locale == 'en'" class="hero__section__container">
                <h1 class="hero__section__container__title gradient-font">
                    Portfolio
                </h1>
                <p class="hero__section__container__subtitle ">
                    My portfolio showcases a range of projects that highlight my commitment to quality and user-centric design.
                </p>
            </div>
            <div v-else class="hero__section__container container">
                <h1 class="hero__section__container__title gradient-font">
                    Portifólio
                </h1>
                <p class="hero__section__container__subtitle ">
                    Meu portfólio exibe uma variedade de projetos que destacam meu compromisso com a qualidade e o design centrado no usuário.
                </p>
            </div>
        </section>

        <PortfolioList :projects="allProjects" />

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

const allProjects = computed(() => {
    const projects = portfolio[locale.value]
    const projectsOrder = projects.reverse()
    return projectsOrder
})

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
            font-size: $size_20px;
        }
    }

}
</style>