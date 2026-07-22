<template>
    <div>
        <section class="hero__section section">
            <div v-if="locale == 'en'" class="hero__section__container container">
                <h1 class="hero__section__container__title gradient-font">
                    Portfolio
                </h1>
                <p class="hero__section__container__subtitle ">
                    My portfolio reflects my work as a <strong>Fullstack Developer & Designer</strong> with end-to-end digital solutions where design, code, and purpose come together.
                </p>
            </div>
            <div v-else class="hero__section__container container">
                <h1 class="hero__section__container__title gradient-font">
                    Portfólio
                </h1>
                <p class="hero__section__container__subtitle ">
                    Meu portfólio reflete meu trabalho como <strong>Desenvolvedor Fullstack & Designer</strong> com soluções digitais completas onde design, código e propósito se encontram.
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
    return [...projects]
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