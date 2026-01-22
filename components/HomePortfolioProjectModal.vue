<template>
    <AppModal class="modal__project" :openedModal="openedModal" @close:modal="closeModal">
        <div class="modal__project__body">
            <div class="modal__project__body__description">
                <header class="modal__project__body__description__header">
                    <h2 class="modal__project__body__description__header__title">{{ projectDetails.name }}</h2>
                    <h3 class="modal__project__body__description__header__subtitle">
                        {{ projectDetails.client }}
                    </h3>
                    <ul class="modal__project__body__description__header__tags">
                        <li v-for="tag in projectDetails.tags" :key="tag"
                            class="modal__project__body__description__header__tags__item">
                            {{ tag }}
                        </li>
                    </ul>

                </header>
                <div class="modal__project__body__description__content" v-html="projectDetails.description" />
                <footer class="modal__project__body__description__footer">
                    <small>
                        Stacks & Tools:
                        <AppStackSkills small :stacks="projectDetails.stacks" />
                    </small>
                    <AppButton v-if="projectDetails.live_url" aria-label="See More" class="outline small full-width"
                        :hasLink="projectDetails.live_url" target="_blank">
                        See More
                        <AppIcon IconName="ph:arrow-up-right-bold" />
                    </AppButton>
                </footer>
            </div>
            <ul class="modal__project__body__gallery">
                <li v-for="item in projectDetails.gallery" :key="item.title"
                    class="modal__project__body__gallery__item">
                    <figure>
                        
                        <NuxtImg :alt="item.name" :src="item.image" sizes="100vw sm:600px md:600px lg:1280px"
                            quality="100" densities="x1 x2" :custom="true" loading="lazy"
                            v-slot="{ src, isLoaded, imgAttrs }">
                            <!-- Show the actual image when loaded -->
                            <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

                            <!-- Show a placeholder while loading -->
                            <AppIcon v-else IconName="carlos-icon:logo-symbol-outline" />
                            <!-- <img v-else src="https://placehold.co/400x400" alt="placeholder" /> -->
                        </NuxtImg>
                        <figcaption>
                            {{ item.title }}
                        </figcaption>
                    </figure>
                </li>
            </ul>
        </div>
    </AppModal>
</template>

<script setup>
import { toRefs } from '#imports'
const props = defineProps({
    projectDetails: {
        type: Object,
        required: true
    },
    openedModal: {
        type: Boolean,
        default: false
    }
})

const { projectDetails, openedModal } = toRefs(props)

const emits = defineEmits(['close:modal'])
function closeModal(){
    emits('close:modal')
}
</script>

<style lang="scss" scoped>
.modal__project{
    &__body{
        display: grid;
        grid-template-columns: 440px 1fr;
        @media(max-width: $br_mobile) {
            grid-template-columns: 1fr;
        }
        &__description{
            display: flex;
            flex-direction: column;
            &__header{
                padding: 40px 40px 0 40px;
                @media(max-width: $br_mobile) {
                    padding-inline: 20px;
                }
                &__title{
                    font-size: $size_24px;
                    margin-block: 20px 8px;
                    line-height: $size_32px;
                }
                &__subtitle{
                    font-size: $size_14px;
                    margin: 0;
                    padding-block: 4px;
                    font-weight: normal;
                    font-family: $font_tertiary;
                    color: var(--text_color_smooth);
                    text-transform: uppercase;
                }
                &__tags{
                    margin-block: 20px;
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                
                    &__item {
                        // background-color: var(--text_color_transparent);
                        color: var(--text_color);
                        border-radius: 8px;
                        padding: 4px 8px;
                        font-size: $size_12px;
                        font-family: $font_secondary;
                        text-transform: uppercase;
                        font-weight: 600;
                        border: 1px solid var(--primary);
                    }
                }
                
            }
            &__content{
                flex-grow: 1;
                font-weight: normal;
                font-size: $size_16px;
                padding-inline: 40px;
                @media(max-width: $br_mobile) {
                    padding-inline: 20px;
                }
            }
            &__footer {
                padding: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 28px;
                @media(max-width: $br_mobile) {
                    padding-inline: 20px;
                }

                small {
                    text-align: center;
                    text-transform: uppercase;
                    color: var(--text_color_smooth);
                    font-size: $size_12px;
                    font-weight: 400;
                    letter-spacing: 4px;

                    ul {
                        margin-top: 12px;
                        letter-spacing: normal;
                    }
                }

                @media(max-width: $br_mobile) {
                    flex-direction: column;
                    align-items: center;

                    small {
                        text-align: center;
                    }
                }
            }
        }
        &__gallery{
            position: sticky;
            top: 0;
            max-height: 100vh;
            overflow: auto;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
            width: 100%;
            background-color: var(--text_color_transparent);
            padding: 20px;
            &__item{
                max-width: fit-content;
                figure{
                    img{
                        // background-color: var(--text_color_transparent);
                        border-radius: 8px;
                        max-width: 100%;
                        display: inline-block;
                    }
                    figcaption{
                        margin-block: 20px;
                        font-size: $size_14px;
                        font-family: $font_secondary;
                        margin-inline: auto;
                        max-width: 600px;
                        color: var(--text_color);
                    }
                    i {
                        height: 380px;
                        font-size: 100px;
                        animation: rotate 2s infinite linear;
                    }
                }
            }
        }
        
    }
    
}
</style>