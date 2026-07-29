<template>
    <div class="faq-accordion">
        <div
            v-for="(item, index) in flatItems"
            :key="index"
            class="faq-accordion__item"
            :class="{ 'faq-accordion__item--open': openIndex === index }"
            @click="toggle(index)"
        >
            <div class="faq-accordion__item__header">
                <div class="faq-accordion__item__header__left">
                    <span class="faq-accordion__item__header__icon-box">
                        <AppIcon :IconName="item.icon" />
                    </span>
                    <span class="faq-accordion__item__header__question">
                        {{ $t(item.q) }}
                    </span>
                </div>
                <span
                    class="faq-accordion__item__header__arrow"
                    :class="{ 'faq-accordion__item__header__arrow--open': openIndex === index }"
                >
                    <AppIcon IconName="material-symbols:keyboard-arrow-up-rounded" />
                </span>
            </div>
            <div
                class="faq-accordion__item__content"
                :class="{ 'faq-accordion__item__content--open': openIndex === index }"
            >
                <p class="faq-accordion__item__content__text">{{ $t(item.a) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from '#imports'

const props = defineProps({
    categories: {
        type: Array,
        required: true
    }
})

const openIndex = ref(null)

function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index
}

const flatItems = computed(() => {
    const items = []
    props.categories.forEach(category => {
        category.items.forEach(item => {
            items.push({
                icon: item.icon || category.icon,
                q: item.q,
                a: item.a
            })
        })
    })
    return items
})
</script>

<style lang="scss" scoped>
.faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__item {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        cursor: pointer;
        transition: border-color 0.3s ease;

        &--open {
            border-color: rgba(255, 255, 255, 0.25);
        }

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 20px 24px;

            &__left {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            &__icon-box {
                width: 36px;
                height: 36px;
                border-radius: 10px;
                display: grid;
                place-items: center;
                background: var(--primary);
                flex-shrink: 0;

                i {
                    font-size: 18px;
                    color: #131315;
                }
            }

            &__question {
                font-family: $font_primary;
                font-size: $size_16px;
                font-weight: 500;
                color: var(--text_color);
                line-height: 1.5;
            }

            &__arrow {
                display: grid;
                place-items: center;
                flex-shrink: 0;
                transition: transform 0.3s ease;

                i {
                    font-size: 20px;
                    color: var(--text_color);
                }

                &--open {
                    transform: rotate(180deg);
                }
            }
        }

        &__content {
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            max-height: 0;
            padding: 0 24px;

            &--open {
                max-height: 300px;
                padding: 0 24px 20px;
            }

            &__text {
                margin: 0;
                font-family: $font_tertiary;
                font-size: $size_14px;
                line-height: 1.7;
                color: var(--text_color_smooth);
            }
        }
    }
}
</style>
