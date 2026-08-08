<template>
    <section id="faq" class="faq__section section">
        <div class="faq__section__container container">
            <div class="faq__section__header">
                <h2 class="small-title">
                    {{ $t(faq.title) }}
                </h2>
                <h3 class="large-title">
                    {{ $t(faq.subTitle) }}
                </h3>
                <p>
                    {{ $t(faq.text) }}
                </p>
            </div>
            <FaqAccordion :categories="faqCategories" />
        </div>
    </section>
</template>

<script setup>
import { computed } from '#imports'

const faq = {
    title: 'faq.title',
    subTitle: 'faq.subtitle',
    text: 'faq.text'
}

const faqCategories = computed(() => [
    {
        icon: 'carlos-icon:about',
        label: 'faq.categories.career',
        items: [
            { icon: 'material-symbols:code', q: 'faq.items.career_1_q', a: 'faq.items.career_1_a' },
            { icon: 'material-symbols:palette', q: 'faq.items.career_2_q', a: 'faq.items.career_2_a' }
        ]
    },
    {
        icon: 'carlos-icon:services',
        label: 'faq.categories.services',
        items: [
            { icon: 'material-symbols:web', q: 'faq.items.services_1_q', a: 'faq.items.services_1_a' },
            { icon: 'material-symbols:smartphone', q: 'faq.items.services_2_q', a: 'faq.items.services_2_a' }
        ]
    },
    {
        icon: 'carlos-icon:portfolio',
        label: 'faq.categories.tech',
        items: [
            { icon: 'material-symbols:devices', q: 'faq.items.tech_1_q', a: 'faq.items.tech_1_a' },
            { icon: 'material-symbols:compare', q: 'faq.items.tech_2_q', a: 'faq.items.tech_2_a' }
        ]
    },
    {
        icon: 'carlos-icon:graphic-design',
        label: 'faq.categories.budget',
        items: [
            { icon: 'material-symbols:payments', q: 'faq.items.budget_1_q', a: 'faq.items.budget_1_a' },
            { icon: 'material-symbols:schedule', q: 'faq.items.budget_2_q', a: 'faq.items.budget_2_a' }
        ]
    }
])
</script>

<style lang="scss" scoped>
.faq__section{
    padding-block: 80px;
    &__container{
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .small-title, .large-title {
            text-align: center;
            max-width: 600px;
            margin-inline: auto;
        }

        p {
            margin-top: 16px;
            max-width: 600px;
            color: var(--text_color);
            line-height: 1.6;
        }
    }
}
</style>
