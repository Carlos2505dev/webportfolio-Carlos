<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useI18n, useRoute, computed } from '#imports'

const { t, locale } = useI18n()
const route = useRoute()

const siteUrl = 'https://carlosnetodev.vercel.app'
const canonicalUrl = computed(() => {
    const path = route.path
    const query = route.query.project ? `?project=${route.query.project}` : ''
    return `${siteUrl}${path}${query}`
})

const ogLocale = computed(() => locale.value === 'pt' ? 'pt_BR' : 'en_US')

const jsonLd = computed(() => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            name: 'Carlos Neto',
            givenName: 'Carlos',
            familyName: 'Neto',
            alternateName: 'Carlos Bezerra Neto',
            jobTitle: 'Fullstack Developer & Designer',
            description: t('jsonLd.personDescription'),
            url: siteUrl,
            image: `${siteUrl}/avatar_website.webp`,
            sameAs: [
                'https://www.linkedin.com/in/carlosbezerraneto/',
                'https://github.com/Carlos2505dev'
            ],
            knowsAbout: ['Vue.js', 'Nuxt', 'React', 'React Native', 'TypeScript', 'JavaScript', 'UI/UX Design', 'Supabase', 'PostgreSQL'],
            worksFor: {
                '@type': 'Organization',
                name: 'Carlos Neto Freelancer'
            }
        },
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: t('jsonLd.websiteName'),
            description: t('jsonLd.websiteDescription'),
            inLanguage: locale.value === 'pt' ? 'pt-BR' : 'en-US',
            publisher: { '@id': `${siteUrl}/#person` }
        }
    ]
}))

useHead({
    title: () => t('seo.title'),
    link: [
        { rel: 'canonical', href: canonicalUrl }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: () => JSON.stringify(jsonLd.value)
        }
    ]
})

useSeoMeta({
    ogTitle: () => t('seo.title'),
    description: () => t('seo.description'),
    ogDescription: () => t('seo.description'),
    keywords: () => t('seo.keywords'),
    ogImage: '/avatar_website.webp',
    ogImageWidth: 512,
    ogImageHeight: 512,
    ogImageAlt: () => t('seo.title'),
    ogUrl: canonicalUrl,
    ogSiteName: 'Carlos Neto',
    ogLocale: ogLocale,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => t('seo.title'),
    twitterDescription: () => t('seo.description'),
    twitterImage: '/avatar_website.webp',
    twitterCreator: '@carlosnetodev',
    author: 'Carlos Neto'
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
