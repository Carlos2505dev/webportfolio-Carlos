<template>
    <AppModal class="modal__project" :openedModal="openedModal" @close:modal="closeModal">
        <div v-if="projectDetails" class="modal__project__body">
            <div class="modal__project__body__description">
                <header class="modal__project__body__description__header">
                    <h2 class="modal__project__body__description__header__title">{{ $t(projectDetails.name) }}</h2>
                    <h3 class="modal__project__body__description__header__subtitle">
                        {{ $t(projectDetails.client) }}
                    </h3>
                    <ul class="modal__project__body__description__header__tags">
                        <li v-for="tag in projectDetails.tags" :key="tag"
                            class="modal__project__body__description__header__tags__item">
                            {{ $t(tag) }}
                        </li>
                    </ul>

                </header>
                <div class="modal__project__body__description__content" v-html="$t(projectDetails.description)" />
                <div v-if="projectDetails.github_url || projectDetails.multi_github || projectDetails.download_url || projectDetails.live_url || projectDetails.app_store_url || projectDetails.play_store_url" class="modal__project__body__description__actions">
                    <div v-if="projectDetails.multi_github" ref="githubDropdownRef" class="dropdown-wrapper">
                        <AppButton class="outline" @click.prevent="toggleGithubDropdown" style="text-transform: uppercase">
                            <AppIcon IconName="ph:github-logo-bold" />
                            {{ $t('common.view_github') }}
                        </AppButton>
                        <Transition name="dropdown-fade">
                            <div v-if="showGithubDropdown" class="dropdown-menu">
                                <a v-for="link in projectDetails.multi_github" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer" @click="showGithubDropdown = false">
                                    <AppIcon :IconName="link.icon" />
                                    {{ $t(link.label) }}
                                </a>
                            </div>
                        </Transition>
                    </div>
                    <AppButton v-else-if="projectDetails.github_url" class="outline" :hasLink="projectDetails.github_url" target="_blank" style="text-transform: uppercase">
                        <AppIcon IconName="ph:github-logo-bold" />
                        {{ $t('common.view_github') }}
                    </AppButton>
                    <div v-if="projectDetails.multi_live" ref="liveDropdownRef" class="dropdown-wrapper">
                        <AppButton class="primary" @click.prevent="toggleLiveDropdown" style="text-transform: uppercase">
                            <AppIcon IconName="ph:globe-bold" />
                            {{ $t('common.view_live') }}
                        </AppButton>
                        <Transition name="dropdown-fade">
                            <div v-if="showLiveDropdown" class="dropdown-menu">
                                <a v-for="link in projectDetails.multi_live" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer" @click="showLiveDropdown = false">
                                    <AppIcon :IconName="link.icon" />
                                    {{ $t(link.label) }}
                                </a>
                            </div>
                        </Transition>
                    </div>
                    <AppButton v-else-if="projectDetails.live_url" class="primary" :hasLink="projectDetails.live_url || '#'" target="_blank" style="text-transform: uppercase">
                        <AppIcon IconName="ph:globe-bold" />
                        {{ $t('common.view_live') }}
                    </AppButton>
                    <div v-if="projectDetails.app_store_url || projectDetails.play_store_url" class="store-buttons">
                        <AppButton v-if="projectDetails.app_store_url" class="outline" :hasLink="projectDetails.app_store_url" target="_blank" style="text-transform: uppercase">
                            <AppIcon IconName="carlos-icon:app-store-white" />
                            {{ $t('common.view_app_store') }}
                        </AppButton>
                        <AppButton v-if="projectDetails.play_store_url" class="outline" :hasLink="projectDetails.play_store_url" target="_blank" style="text-transform: uppercase">
                            <AppIcon IconName="carlos-icon:google-play" />
                            {{ $t('common.view_play_store') }}
                        </AppButton>
                    </div>
                    <AppButton v-if="projectDetails.download_url" class="primary" :hasLink="projectDetails.download_url" :download="projectDetails.download_url.split('/').pop()" style="text-transform: uppercase">
                        <AppIcon IconName="ph:download-bold" />
                        {{ $t('common.download_menu') }}
                    </AppButton>
                </div>
                <footer class="modal__project__body__description__footer">
                    <small>
                        {{ $t('common.stacks_and_tools') }}
                        <AppStackSkills small :stacks="projectDetails.stacks" />
                    </small>
                </footer>
            </div>
            <ul class="modal__project__body__gallery">
                <li v-for="item in projectDetails.gallery" :key="item.image"
                    class="modal__project__body__gallery__item">
                    <figure>
                        
                        <NuxtImg :alt="$t(item.title)" :src="item.image" sizes="100vw sm:600px md:600px lg:1280px"
                            quality="100" densities="x1 x2" :custom="true" loading="lazy"
                            v-slot="{ src, isLoaded, imgAttrs }">
                            <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                            <img 
                                v-else 
                                src="~/assets/carlos-icons/logo-symbol-outline.png" 
                                class="placeholder-logo" 
                                alt="Carregando..."
                            />
                        </NuxtImg>
                        <figcaption>
                            {{ $t(item.title) }}
                        </figcaption>
                    </figure>
                </li>
            </ul>
        </div>
    </AppModal>
</template>

<script setup>
import { toRefs, ref } from '#imports'
import { onClickOutside } from '@vueuse/core'

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

const showGithubDropdown = ref(false)
const showLiveDropdown = ref(false)
const githubDropdownRef = ref(null)
const liveDropdownRef = ref(null)

function toggleGithubDropdown() {
    showGithubDropdown.value = !showGithubDropdown.value
    showLiveDropdown.value = false
}

function toggleLiveDropdown() {
    showLiveDropdown.value = !showLiveDropdown.value
    showGithubDropdown.value = false
}

onClickOutside(githubDropdownRef, () => {
    showGithubDropdown.value = false
})
onClickOutside(liveDropdownRef, () => {
    showLiveDropdown.value = false
})

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
            :deep(.proprietary-notice) {
                color: var(--primary_dark);
                font-style: italic;
                font-size: $size_14px;
                margin-top: 24px;
            }
            &__actions {
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
                padding-block: 16px 0;
                padding-inline: 40px;
                @media(max-width: $br_mobile) {
                    padding-inline: 20px;
                }

                .store-buttons {
                    display: flex;
                    gap: 12px;
                }

                .dropdown-wrapper {
                    position: relative;

                    .dropdown-menu {
                        position: absolute;
                        top: calc(100% + 8px);
                        left: 50%;
                        transform: translateX(-50%);
                        min-width: 220px;
                        background: var(--bg_color);
                        border: 2px solid var(--text_color);
                        border-radius: 12px;
                        overflow: hidden;
                        z-index: 10;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.15);

                        a {
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            padding: 14px 20px;
                            text-decoration: none;
                            color: var(--text_color);
                            font-family: $font_secondary;
                            font-size: $size_14px;
                            font-weight: 500;
                            transition: $transition_default;
                            border-bottom: 1px solid var(--text_color_transparent);

                            &:last-child {
                                border-bottom: none;
                            }

                            &:hover {
                                background-color: var(--text_color);
                                color: var(--bg_color);
                            }
                        }
                    }
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
                    .placeholder-logo {
                        height: 100px;
                        width: 100px;
                        margin-block: 140px;
                        object-fit: contain;
                        animation: rotate 2s infinite linear;
                    }
                }
            }
        }
        
    }
    
}

:deep(.dropdown-fade-enter-active),
:deep(.dropdown-fade-leave-active) {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
:deep(.dropdown-fade-enter-from),
:deep(.dropdown-fade-leave-to) {
    opacity: 0;
    transform: translateY(-4px);
}
</style>