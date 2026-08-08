<template>
    <section id="depoimentos" class="testimonials__section section">
        <div class="testimonials__section__container container">
            <div class="testimonials__section__header">
                <h2 class="small-title">
                    {{ $t('testimonials.tag') }}
                </h2>
                <h3 class="large-title">
                    {{ $t('testimonials.title') }}
                </h3>
                <p class="testimonials__section__header__text">
                    {{ $t('testimonials.subtitle') }}
                </p>
            </div>

            <div ref="marqueeRef"
                 class="testimonials__section__marquee"
                 @pointerenter="pause"
                 @pointerleave="resume"
            >
                <div class="testimonials__section__marquee__track">
                    <div v-for="n in 3"
                         :key="'l-' + n"
                         class="testimonials__section__marquee__track__group"
                         :class="{ 'is-paused': isPaused }"
                    >
                        <article v-for="(item, i) in items"
                                 :key="'l-' + n + '-' + i"
                                 class="testimonials__card"
                        >
                            <p class="testimonials__card__body">&ldquo;{{ $t(item.body) }}&rdquo;</p>
                            <div class="testimonials__card__author">
                                <figure class="testimonials__card__author__avatar">
                                    <NuxtImg :src="item.image"
                                             :alt="item.name"
                                             width="80"
                                             height="80"
                                             format="webp"
                                             densities="x1 x2"
                                             quality="100"
                                             loading="lazy"
                                    />
                                </figure>
                                <div class="testimonials__card__author__info">
                                    <strong class="testimonials__card__author__info__name">{{ item.name }}</strong>
                                    <span class="testimonials__card__author__info__role">{{ $t(item.role) }}</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from '#imports'

const isPaused = ref(false)
const marqueeRef = ref(null)

function pause() { isPaused.value = true }
function resume() { isPaused.value = false }

function handleDocumentClick(e) {
    if (marqueeRef.value && !marqueeRef.value.contains(e.target)) {
        resume()
    }
}

onMounted(() => document.addEventListener('click', handleDocumentClick))
onUnmounted(() => document.removeEventListener('click', handleDocumentClick))

const items = [
    { name: 'InoveTech', role: 'testimonials.items.0.role', image: '/images/clients/InoveTech.png', body: 'testimonials.items.0.body' },
    { name: 'Meu Maná', role: 'testimonials.items.1.role', image: '/images/clients/Meu-Mana.png', body: 'testimonials.items.1.body' },
    { name: 'GoRango', role: 'testimonials.items.2.role', image: '/images/clients/GoRango.png', body: 'testimonials.items.2.body' },
    { name: 'Dolce Amore', role: 'testimonials.items.3.role', image: '/images/clients/DolceAmore.png', body: 'testimonials.items.3.body' },
    { name: 'Enjoy Brasil', role: 'testimonials.items.4.role', image: '/images/clients/Enjoy Brasil.png', body: 'testimonials.items.4.body' },
    { name: 'AME', role: 'testimonials.items.5.role', image: '/images/clients/AME.png', body: 'testimonials.items.5.body' }
]
</script>

<style lang="scss" scoped>
@keyframes marquee-left {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% - 1.25rem)); }
}

.testimonials__section {
    position: relative;
    padding-block: 80px;
    overflow: hidden;

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

        &__text {
            max-width: 600px;
            margin-top: 16px;
            color: var(--text_color);
            line-height: 1.6;
        }
    }

    &__marquee {
        margin-top: 48px;
        overflow: hidden;
        padding-top: 8px;

        &__track {
            --duration: 80s;
            display: flex;
            gap: 0;

            > .testimonials__section__marquee__track__group {
                animation: marquee-left var(--duration) linear infinite;

                &.is-paused {
                    animation-play-state: paused !important;
                }
            }

            &__group {
                --card-gap: 1.25rem;
                display: flex;
                flex-shrink: 0;
                gap: var(--card-gap);
                padding-right: var(--card-gap);
            }
        }
    }
}

.testimonials__card {
    display: flex;
    flex-direction: column;
    width: 16rem;
    flex-shrink: 0;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid var(--text_color_transparent);
    background: linear-gradient(180deg, var(--bg_color_transparent), rgba(255,255,255,.02));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

    .dark-theme & {
        background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    }

    .light-theme & {
        background: linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.01));
    }

    &:hover {
        transform: translateY(-4px);
        border-color: var(--primary);
        box-shadow: 0 8px 32px 0 rgba(138, 237, 19, 0.35);
    }

    .dark-theme &:hover {
        box-shadow: 0 8px 32px 0 rgba(138, 237, 19, 0.25);
    }

    .light-theme &:hover {
        box-shadow: 0 8px 32px 0 rgba(138, 237, 19, 0.4);
    }

    &__body {
        margin: 0 0 16px;
        font-size: $size_12px;
        line-height: 1.5;
        color: var(--text_color);
        font-family: $font_tertiary;
    }

    &__author {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 12px;

        &__avatar {
            width: 44px;
            height: 44px;
            border-radius: 100%;
            overflow: hidden;
            flex-shrink: 0;
            display: grid;
            place-items: center;
            background: var(--bg_color);
            border: 2px solid var(--text_color_transparent);

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                padding: 6px;
                display: block;
            }
        }

        &__info {
            display: flex;
            flex-direction: column;

            &__name {
                font-size: $size_14px;
                font-weight: 600;
                line-height: 1.3;
                color: var(--text_color);
                font-family: $font_primary;
            }

            &__role {
                font-size: $size_12px;
                line-height: 1.3;
                color: var(--text_color_smooth);
                font-family: $font_secondary;
            }
        }
    }
}
</style>