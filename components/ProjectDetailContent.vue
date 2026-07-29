<template>
    <div class="project-detail">
        <div class="project-detail__description">
            <header class="project-detail__description__header">
                <h2 class="project-detail__description__header__title">{{ $t(project.name) }}</h2>
                <h3 class="project-detail__description__header__subtitle">
                    {{ $t(project.client) }}
                </h3>
                <ul class="project-detail__description__header__tags">
                    <li v-for="tag in project.tags" :key="tag"
                        class="project-detail__description__header__tags__item">
                        {{ $t(tag) }}
                    </li>
                </ul>
            </header>
            <div class="project-detail__description__content" v-html="$t(project.description)" />
            <div v-if="hasActions" class="project-detail__description__actions">
                <div v-if="project.multi_github" ref="githubDropdownRef" class="dropdown-wrapper">
                    <AppButton class="outline" @click.prevent="toggleGithubDropdown" style="text-transform: uppercase">
                        <AppIcon IconName="ph:github-logo-bold" />
                        {{ $t('common.view_github') }}
                    </AppButton>
                    <Transition name="dropdown-fade">
                        <div v-if="showGithubDropdown" class="dropdown-menu">
                            <a v-for="link in project.multi_github" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer" @click="showGithubDropdown = false">
                                <AppIcon :IconName="link.icon" />
                                {{ $t(link.label) }}
                            </a>
                        </div>
                    </Transition>
                </div>
                <AppButton v-else-if="project.github_url" class="outline" :hasLink="project.github_url" target="_blank" style="text-transform: uppercase">
                    <AppIcon IconName="ph:github-logo-bold" />
                    {{ $t('common.view_github') }}
                </AppButton>
                <div v-if="project.multi_live" ref="liveDropdownRef" class="dropdown-wrapper">
                    <AppButton class="primary" @click.prevent="toggleLiveDropdown" style="text-transform: uppercase">
                        <AppIcon IconName="ph:globe-bold" />
                        {{ $t('common.view_live') }}
                    </AppButton>
                    <Transition name="dropdown-fade">
                        <div v-if="showLiveDropdown" class="dropdown-menu">
                            <a v-for="link in project.multi_live" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer" @click="showLiveDropdown = false">
                                <AppIcon :IconName="link.icon" />
                                {{ $t(link.label) }}
                            </a>
                        </div>
                    </Transition>
                </div>
                <AppButton v-else-if="project.live_url" class="primary" :hasLink="project.live_url || '#'" target="_blank" style="text-transform: uppercase">
                    <AppIcon IconName="ph:globe-bold" />
                    {{ $t('common.view_live') }}
                </AppButton>
                <div v-if="project.app_store_url || project.play_store_url" class="store-buttons">
                    <AppButton v-if="project.app_store_url" class="outline" :hasLink="project.app_store_url" target="_blank" style="text-transform: uppercase">
                        <AppIcon IconName="carlos-icon:app-store-white" />
                        {{ $t('common.view_app_store') }}
                    </AppButton>
                    <AppButton v-if="project.play_store_url" class="outline" :hasLink="project.play_store_url" target="_blank" style="text-transform: uppercase">
                        <AppIcon IconName="carlos-icon:google-play" />
                        {{ $t('common.view_play_store') }}
                    </AppButton>
                </div>
                <AppButton v-if="project.download_url" class="primary" :hasLink="project.download_url" :download="project.download_url.split('/').pop()" style="text-transform: uppercase">
                    <AppIcon IconName="ph:download-bold" />
                    {{ $t('common.download_menu') }}
                </AppButton>
            </div>
            <footer class="project-detail__description__footer">
                <small>
                    {{ $t('common.stacks_and_tools') }}
                    <AppStackSkills small :stacks="project.stacks" />
                </small>
            </footer>
        </div>
        <ul class="project-detail__gallery">
            <li v-for="item in project.gallery" :key="item.image"
                class="project-detail__gallery__item">
                <figure>
                    <NuxtImg :alt="$t(item.title)" :src="item.image" sizes="100vw sm:600px md:600px lg:1280px"
                        quality="100" densities="x1 x2" :custom="true" loading="lazy"
                        v-slot="{ src, isLoaded, imgAttrs }">
                        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                        <img 
                            v-else 
                            src="~/assets/carlos-icons/logo-symbol-outline.png" 
                            class="placeholder-logo" 
                            :alt="$t('common.loading')"
                        />
                    </NuxtImg>
                    <figcaption>
                        {{ $t(item.title) }}
                    </figcaption>
                </figure>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, toRefs, computed } from '#imports'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

const { project } = toRefs(props)

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

const hasActions = computed(() => {
    return project.value.github_url || project.value.multi_github || project.value.download_url || project.value.live_url || project.value.app_store_url || project.value.play_store_url
})
</script>

<style lang="scss" scoped>
.project-detail{
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
                gap: 8px;

                :deep(.button) {
                    font-size: $size_14px;
                    padding: 8px 14px;
                    white-space: nowrap;

                    i {
                        font-size: $size_16px;
                    }

                    &:hover i,
                    &:active i,
                    &:focus i {
                        filter: brightness(0);
                    }
                }
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
