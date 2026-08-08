<template>
    <div class="project-page">
        <section class="project-page__hero section">
            <div class="container">
                <AppButton class="outline" hasLink="/portfolio">
                    <AppIcon IconName="ph:arrow-left-bold" />
                    {{ $t('common.back_to_portfolio') }}
                </AppButton>
            </div>
        </section>

        <section v-if="project" class="project-page__content section">
            <ProjectDetailContent :project="project" />
        </section>

        <section v-else class="project-page__not-found section">
            <div class="container">
                <h1>{{ $t('common.project_not_found') }}</h1>
                <AppButton class="primary" hasLink="/portfolio">
                    {{ $t('common.back_to_portfolio') }}
                </AppButton>
            </div>
        </section>

        <HomeContact />
    </div>
</template>

<script setup>
import { computed, useI18n, useHead, useSeoMeta } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t, locale } = useI18n()

import portfolio from '@/localData/portfolio'

const slug = computed(() => route.params.slug)
const project = computed(() => portfolio.find(p => p.slug === slug.value))

const siteUrl = 'https://carlosnetodev.vercel.app'
const projectUrl = computed(() => `${siteUrl}/${locale.value}/portfolio/${slug.value}`)

useHead({
    htmlAttrs: {
        lang: locale
    }
})

const pageTitle = computed(() => {
    if (!project.value) return t('seo.title_portfolio')
    return `${t(project.value.name)} — ${t('seo.title_portfolio')}`
})

const pageDescription = computed(() => {
    if (!project.value) return t('seo.description_portfolio')
    const desc = t(project.value.description)
    const plain = desc.replace(/<[^>]*>/g, '')
    return plain.slice(0, 160)
})

const pageImage = computed(() => {
    return project.value?.image || '/images/portfolio/meumana_cover.webp'
})

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: pageImage,
    ogUrl: projectUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image'
})
</script>

<style lang="scss" scoped>
.project-page {
    &__hero {
        padding-block: 180px 40px;
    }

    &__not-found {
        text-align: center;
        padding-block: 80px 40px;

        h1 {
            font-size: $size_32px;
            margin-bottom: 24px;
        }
    }
}
</style>
