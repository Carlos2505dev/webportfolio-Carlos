<template>
    <section class="portfolio__section section">
        <div class="portfolio__section__container">

            <div class="portfolio__section__container__filters">
                <div class="portfolio__section__container__filters__bar">
                    <div class="portfolio__section__container__filters__bar__search">
                        <AppIcon IconName="ph:magnifying-glass-bold" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            :placeholder="$t('portfolio_page.search_placeholder')"
                        />
                        <button
                            v-if="searchQuery"
                            class="search-clear"
                            @click="searchQuery = ''"
                            :aria-label="$t('common.aria.close')"
                        >
                            <AppIcon IconName="ph:x-bold" />
                        </button>
                    </div>
                    <button
                        class="portfolio__section__container__filters__bar__toggle"
                        :class="{ active: showFilters }"
                        @click="showFilters = !showFilters"
                        :aria-label="$t('portfolio_page.filter_toggle')"
                    >
                        <AppIcon IconName="ph:funnel-bold" />
                        <span v-if="totalActiveFilters > 0" class="badge">{{ totalActiveFilters }}</span>
                    </button>
                </div>

                <div v-if="hasActiveFilters" class="portfolio__section__container__filters__chips">
                    <button
                        v-for="cat in selectedCategories"
                        :key="'cat-'+cat"
                        class="chip"
                        @click="toggleCategory(cat)"
                    >
                        {{ getCategoryLabel(cat) }}
                        <AppIcon IconName="ph:x-bold" />
                    </button>
                    <button
                        v-for="tech in selectedTechs"
                        :key="'tech-'+tech"
                        class="chip"
                        @click="toggleTech(tech)"
                    >
                        {{ tech }}
                        <AppIcon IconName="ph:x-bold" />
                    </button>
                    <button class="chip-clear" @click="clearFilters">
                        <AppIcon IconName="ph:x-bold" />
                    </button>
                    <span class="chip-count">{{ filteredProjects.length }} {{ filteredProjects.length === 1 ? $t('common.project_singular') : $t('common.project_plural') }}</span>
                </div>

                <Transition name="panel">
                    <div
                        v-if="showFilters"
                        ref="panelRef"
                        class="portfolio__section__container__filters__panel"
                    >
                        <div class="portfolio__section__container__filters__panel__section">
                            <h4>{{ $t('portfolio_page.filter_category_label') }}</h4>
                            <div class="options">
                                <label
                                    v-for="cat in categoryOptions"
                                    :key="cat.key"
                                    class="option"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="selectedCategories.includes(cat.key)"
                                        @change="toggleCategory(cat.key)"
                                    />
                                    <span class="check"></span>
                                    <span class="label">{{ cat.label }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="portfolio__section__container__filters__panel__section">
                            <h4>{{ $t('portfolio_page.filter_tech_label') }}</h4>
                            <div class="options">
                                <label
                                    v-for="tech in uniqueTechnologies"
                                    :key="tech"
                                    class="option"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="selectedTechs.includes(tech)"
                                        @change="toggleTech(tech)"
                                    />
                                    <span class="check"></span>
                                    <span class="label">{{ tech }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="portfolio__section__container__filters__panel__actions">
                            <button class="btn-done" @click="showFilters = false">{{ $t('portfolio_page.filter_done') }}</button>
                            <button v-if="hasActiveFilters" class="btn-clear-all" @click="clearFilters(); showFilters = false">{{ $t('portfolio_page.filter_clear_all') }}</button>
                        </div>
                    </div>
                </Transition>

                <div v-if="filteredProjects.length === 0 && hasActiveFilters" class="portfolio__section__container__filters__empty">
                    <AppIcon IconName="ph:magnifying-glass-bold" />
                    <p>{{ $t('portfolio_page.no_results') }}</p>
                </div>
            </div>

            <ul v-if="filteredProjects.length > 0" class="portfolio__section__container__projects">
                <li v-for="(project, index) in filteredProjects" :id="index" :key="project.id"
                    class="portfolio__section__container__projects__item" @touchstart="setDragStart"
                    @touchend="swipeSlider">
                    <div :class="{ active : selectedProj == index }"
                        class="portfolio__section__container__projects__item__contain" @click="goToProj(project.id)">
                        <header class="portfolio__section__container__projects__item__contain__header project-image">
                            <picture class="portfolio__section__container__projects__item__contain__header__picture"
                                @click="viewDetails(index, project.slug)">
                                <NuxtImg :alt="$t(project.name)" :src="project.image"
                                    sizes="100vw sm:380px md:400px lg:800px" quality="100" densities="x1 x2"
                                    :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                                    <img
                                        v-else
                                        src="~/assets/carlos-icons/logo-symbol-outline.png"
                                        class="placeholder-logo"
                                        :alt="$t('common.loading')"
                                    />
                                </NuxtImg>
                            </picture>

                        </header>
                        <div class="portfolio__section__container__projects__item__contain__body project-titles">
                            <NuxtLink :to="'/portfolio/' + project.slug" class="project-title-link">
                                <h3 class="portfolio__section__container__projects__item__contain__body__title">
                                    {{ $t(project.name) }}
                                </h3>
                            </NuxtLink>
                            <h4 class="portfolio__section__container__projects__item__contain__body__subtitle">
                                {{ $t(project.client) }}
                            </h4>
                        </div>
                        <footer class="portfolio__section__container__projects__item__contain__footer project-titles">
                            <ul class="portfolio__section__container__projects__item__contain__footer__tags">
                                <li v-for="tag in project.tags" :key="tag"
                                    class="portfolio__section__container__projects__item__contain__footer__tags__item">
                                    {{ $t(tag) }}
                                </li>
                            </ul>
                        </footer>
                    </div>
                </li>
            </ul>

            <HomePortfolioProjectModal :projectDetails="openedDetails" :openedModal="showModal"
                @close:modal="closeModal" />

        </div>
    </section>
</template>

<script setup>
import { ref, toRefs, computed, watch, useI18n, onMounted, onBeforeUnmount } from '#imports'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const props = defineProps({
    projects: {
        type: Object,
        required: true
    }
})
const { projects } = toRefs(props)

const searchQuery = ref('')
const showFilters = ref(false)
const selectedCategories = ref([])
const selectedTechs = ref([])
const panelRef = ref(null)

function onClickOutside(event) {
    const toggle = document.querySelector('.portfolio__section__container__filters__bar__toggle')
    if (toggle && toggle.contains(event.target)) return
    if (panelRef.value && !panelRef.value.contains(event.target) && showFilters.value) {
        showFilters.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', onClickOutside, true)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside, true)
})

const tagCategoryMap = {
    mobile_application: 'mobile',
    web_application: 'web',
    web_design: 'web',
    landing_page: 'web',
    institutional_website: 'web',
    members_area: 'web',
    admin_panel: 'web',
    dashboard: 'web',
    mvp: 'web',
    ux_ui: 'ux_ui'
}

function getCategoryFromTags(tags) {
    const cats = new Set()
    for (const tag of tags) {
        const key = tag.split('.').pop()
        const mapped = tagCategoryMap[key]
        if (mapped) cats.add(mapped)
    }
    return cats
}

const categoryOptions = computed(() => {
    const keys = ['mobile', 'web', 'ux_ui']
    return keys.map(k => ({
        key: k,
        label: t(`portfolio_page.filter_${k}`)
    }))
})

function getCategoryLabel(key) {
    return t(`portfolio_page.filter_${key}`)
}

function toggleCategory(key) {
    const idx = selectedCategories.value.indexOf(key)
    if (idx > -1) {
        selectedCategories.value.splice(idx, 1)
    } else {
        selectedCategories.value.push(key)
    }
}

function toggleTech(tech) {
    const idx = selectedTechs.value.indexOf(tech)
    if (idx > -1) {
        selectedTechs.value.splice(idx, 1)
    } else {
        selectedTechs.value.push(tech)
    }
}

function normalizeTech(name) {
    const lower = name.toLowerCase()
    if (lower.includes('react')) return 'React'
    if (lower.includes('vue') && lower.includes('nuxt')) return 'Nuxt'
    if (lower.includes('vue')) return 'Vue'
    if (lower.includes('next')) return 'Next'
    if (lower.includes('flutter')) return 'Flutter'
    if (lower.includes('tailwind')) return 'Tailwind'
    if (lower.includes('vite')) return 'Vite'
    if (lower.includes('supabase')) return 'Supabase'
    if (lower.includes('html')) return 'HTML/CSS'
    if (lower.includes('css')) return 'HTML/CSS'
    if (lower.includes('javascript')) return 'JavaScript'
    if (lower.includes('typescript')) return 'TypeScript'
    if (lower.includes('sql') || lower.includes('postgres')) return 'PostgreSQL'
    if (lower.includes('expo')) return 'Expo'
    if (lower.includes('vercel')) return 'Vercel'
    if (lower.includes('canva')) return 'Canva'
    if (lower.includes('chatgpt') || lower.includes('codex')) return 'ChatGPT'
    if (lower.includes('lovable')) return 'Lovable'
    return name
}

const uniqueTechnologies = computed(() => {
    const techs = new Set()
    for (const p of projects.value) {
        for (const s of p.stacks) {
            const n = normalizeTech(s.name)
            techs.add(n)
        }
    }
    return [...techs].sort()
})

function projectMatchesSearch(project) {
    if (!searchQuery.value) return true
    const q = searchQuery.value.toLowerCase()
    const name = t(project.name).toLowerCase()
    const client = t(project.client).toLowerCase()
    return name.includes(q) || client.includes(q)
}

function projectMatchesCategories(project) {
    if (selectedCategories.value.length === 0) return true
    const projectCats = getCategoryFromTags(project.tags)
    return selectedCategories.value.some(c => projectCats.has(c))
}

function projectMatchesTechs(project) {
    if (selectedTechs.value.length === 0) return true
    return project.stacks.some(s => selectedTechs.value.includes(normalizeTech(s.name)))
}

const filteredProjects = computed(() => {
    return projects.value.filter(p => {
        return projectMatchesSearch(p) && projectMatchesCategories(p) && projectMatchesTechs(p)
    })
})

const hasActiveFilters = computed(() => {
    return searchQuery.value || selectedCategories.value.length > 0 || selectedTechs.value.length > 0
})

const totalActiveFilters = computed(() => {
    let count = 0
    if (searchQuery.value) count++
    if (selectedCategories.value.length > 0) count++
    if (selectedTechs.value.length > 0) count++
    return count
})

function clearFilters() {
    searchQuery.value = ''
    selectedCategories.value = []
    selectedTechs.value = []
}

const selectedProj = ref(0)

const modalName = ref(null)
const showModal = computed(() => modalName.value !== null)
const modalContent = ref(null)

const openedDetails = ref(null)

function viewDetails(index, slug) {
    modalName.value = slug
    const project = projects.value.find((proj) => proj.slug === slug)
    if (project) {
        modalContent.value = project
        openedDetails.value = project
        selectedProj.value = index
    } else {
        modalContent.value = t('common.content_not_found')
    }
    router.push({ query: { project: slug } })
}

function closeModal() {
    modalName.value = null
    const { project, ...rest } = route.query
    router.push({ query: rest })
    const projectIndex = projects.value.findIndex(item => item.id === openedDetails.value.id)
    selectedProj.value = projectIndex
}

const initializeModalFromQuery = () => {
    if (route.query.project) {
        const modalFromQuery = route.query.project
        const project = projects.value.find((proj) => proj.slug === modalFromQuery)
        if (project) {
            modalName.value = modalFromQuery
            openedDetails.value = project
            selectedProj.value = projects.value.indexOf(project)
        } else {
            modalName.value = null
        }
    }
}

watch(
    () => route.query.project,
    (newModal) => {
        if (newModal) {
            const project = projects.value.find((proj) => proj.slug === newModal)
            if (project) {
                modalName.value = newModal
                openedDetails.value = project
                selectedProj.value = projects.value.indexOf(project)
            } else {
                modalName.value = null
            }
        } else {
            modalName.value = null
        }
    }
)

initializeModalFromQuery()

function setDragStart() {}
function swipeSlider() {}
function goToProj() {}

</script>

<style lang="scss" scoped>
.portfolio__section{
    padding-block: 0;
    margin-bottom: 80px;
    @media (max-width: $br_mobile) {
        margin-top: 0;
    }
    &__container{
        width: 100%;
        margin-inline: auto;
        gap: 40px;
        position: relative;

        &__filters{
            margin-bottom: 48px;
            display: flex;
            flex-direction: column;
            gap: 16px;

            &__bar{
                display: flex;
                gap: 12px;
                align-items: center;

                &__search{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border: 1px solid var(--text_color_transparent);
                    border-radius: 12px;
                    padding: 12px 16px;
                    transition: $transition_default;
                    background: var(--bg_color);
                    max-width: 480px;

                    &:focus-within{
                        border-color: var(--primary);
                        box-shadow: 0 0 0 3px rgba(#8AED13, 0.15);
                    }

                    i {
                        font-size: $size_20px;
                        color: var(--text_color_smooth);
                        flex-shrink: 0;
                    }

                    input{
                        flex: 1;
                        border: none;
                        background: transparent;
                        color: var(--text_color);
                        font-size: $size_14px;
                        font-family: $font_tertiary;
                        outline: none;
                        &::placeholder{
                            color: var(--text_color_smooth);
                        }
                    }

                    .search-clear{
                        display: grid;
                        place-items: center;
                        background: none;
                        border: none;
                        color: var(--text_color_smooth);
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                        transition: $transition_default;
                        flex-shrink: 0;
                        i {
                            font-size: $size_14px;
                        }
                        &:hover{
                            color: var(--text_color);
                            background: var(--text_color_transparent);
                        }
                    }
                }

                &__toggle{
                    position: relative;
                    display: grid;
                    place-items: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    border: 1px solid var(--text_color_transparent);
                    background: var(--bg_color);
                    color: var(--text_color_smooth);
                    cursor: pointer;
                    transition: $transition_default;
                    flex-shrink: 0;

                    i {
                        font-size: $size_20px;
                    }

                    &:hover{
                        border-color: var(--primary);
                        color: var(--text_color);
                    }

                    &.active{
                        border-color: var(--primary);
                        color: var(--primary);
                        background: rgba(#8AED13, 0.08);
                    }

                    .badge{
                        position: absolute;
                        top: -4px;
                        right: -4px;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: var(--primary);
                        color: var(--pure_black);
                        font-size: 0.625rem;
                        font-weight: 700;
                        display: grid;
                        place-items: center;
                        font-family: $font_secondary;
                    }
                }
            }

            &__chips{
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                align-items: center;

                .chip{
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px 4px 12px;
                    border-radius: 20px;
                    border: 1px solid var(--primary);
                    background: rgba(#8AED13, 0.08);
                    color: var(--text_color);
                    font-size: $size_12px;
                    font-family: $font_secondary;
                    font-weight: 500;
                    cursor: pointer;
                    transition: $transition_default;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;

                    i {
                        font-size: 0.625rem;
                        color: var(--text_color_smooth);
                        transition: $transition_default;
                    }

                    &:hover{
                        border-color: var(--text_color);
                        i {
                            color: var(--text_color);
                        }
                    }
                }

                .chip-clear{
                    display: grid;
                    place-items: center;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 1px solid var(--text_color_transparent);
                    background: transparent;
                    color: var(--text_color_smooth);
                    cursor: pointer;
                    transition: $transition_default;
                    flex-shrink: 0;

                    i {
                        font-size: 0.625rem;
                    }

                    &:hover{
                        border-color: var(--text_color);
                        color: var(--text_color);
                    }
                }

                .chip-count{
                    font-size: $size_12px;
                    color: var(--text_color_smooth);
                    font-family: $font_secondary;
                    margin-left: auto;
                }
            }

            &__panel{
                background: var(--bg_color);
                border: 1px solid var(--text_color_transparent);
                border-radius: 16px;
                padding: 24px;
                max-width: 480px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.12);
                backdrop-filter: blur(12px);

                @media(max-width: $br_mobile){
                    max-width: 100%;
                    padding: 20px 16px;
                    border-radius: 12px;
                }

                &__section{
                    h4{
                        font-size: $size_14px;
                        font-family: $font_secondary;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: var(--text_color_smooth);
                        margin: 0 0 12px;
                    }

                    .options{
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    .option{
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        cursor: pointer;
                        padding: 6px 12px;
                        border-radius: 8px;
                        border: 1px solid var(--text_color_transparent);
                        transition: $transition_default;
                        user-select: none;

                        input{
                            position: absolute;
                            opacity: 0;
                            width: 0;
                            height: 0;
                            pointer-events: none;
                        }

                        .check{
                            width: 16px;
                            height: 16px;
                            border-radius: 4px;
                            border: 2px solid var(--text_color_smooth);
                            display: grid;
                            place-items: center;
                            transition: $transition_default;
                            flex-shrink: 0;
                            position: relative;

                            &::after{
                                content: '';
                                width: 8px;
                                height: 8px;
                                border-radius: 2px;
                                background: var(--primary);
                                opacity: 0;
                                transition: $transition_default;
                                transform: scale(0);
                            }
                        }

                        .label{
                        font-size: 0.8125rem;
                            font-family: $font_tertiary;
                            color: var(--text_color);
                            font-weight: 500;
                        }

                        &:hover{
                            border-color: var(--primary);
                            .check{
                                border-color: var(--primary);
                            }
                        }

                        input:checked + .check{
                            border-color: var(--primary);
                            &::after{
                                opacity: 1;
                                transform: scale(1);
                            }
                        }

                        &:has(input:checked){
                            border-color: var(--primary);
                            background: rgba(#8AED13, 0.06);
                        }
                    }
                }

                .divider{
                    height: 1px;
                    background: var(--text_color_transparent);
                    margin: 16px 0;
                }

                &__actions{
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    margin-top: 20px;
                    padding-top: 16px;
                    border-top: 1px solid var(--text_color_transparent);

                    .btn-done{
                        padding: 8px 20px;
                        border-radius: 8px;
                        border: none;
                        background: var(--primary);
                        color: var(--pure_black);
                        font-size: 0.8125rem;
                        font-family: $font_secondary;
                        font-weight: 600;
                        cursor: pointer;
                        transition: $transition_default;
                        text-transform: uppercase;
                        letter-spacing: 0.03em;

                        &:hover{
                            opacity: 0.85;
                        }
                    }

                    .btn-clear-all{
                        padding: 8px 16px;
                        border-radius: 8px;
                        border: 1px solid var(--text_color_transparent);
                        background: transparent;
                        color: var(--text_color_smooth);
                        font-size: $size_12px;
                        font-family: $font_secondary;
                        cursor: pointer;
                        transition: $transition_default;

                        &:hover{
                            border-color: var(--text_color);
                            color: var(--text_color);
                        }
                    }
                }
            }

            .panel-enter-active,
            .panel-leave-active {
                transition: all 0.25s ease;
                transform-origin: top right;
            }
            .panel-enter-from,
            .panel-leave-to {
                opacity: 0;
                transform: scale(0.95) translateY(-8px);
            }

            &__empty{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                padding: 60px 20px;
                text-align: center;
                i {
                    font-size: $size_40px;
                    color: var(--text_color_transparent);
                }
                p {
                    font-size: $size_14px;
                    color: var(--text_color_smooth);
                    font-family: $font_secondary;
                    margin: 0;
                }
            }
        }

        &__projects{
            display: grid;
            gap: 32px;
            position: relative;
            grid-template-columns: repeat(4, 1fr);
            @media(max-width: $br_desktop){
                grid-template-columns: repeat(3, 1fr);
            }
            @media(max-width: $br_tablet){
                grid-template-columns: repeat(2, 1fr);
            }
            @media(max-width: $br_mobile){
                grid-template-columns: 1fr;
            }
            &__item{
                flex-shrink: 0;
                position: relative;
                width: 100%;
                &:hover{
                    > div{
                        z-index: 4;
                        transform: scale(1.04);
                        @media(max-width:$br_mobile){
                            z-index: 1;
                        }
                        picture{
                            box-shadow: 0 40px 80px 80px var(--bg_color);
                        }
                    }
                }
                &__contain{
                    display: block;
                    color: var(--text_color);
                    position: relative;
                    transition: $transition_default;
                    z-index: 1;
                    &__header{
                        position: relative;
                        &__picture{
                            cursor: pointer;
                            overflow: hidden;
                            border-radius: 12px;
                            display: grid;
                            place-items: center;
                            width: 100%;
                            box-shadow: 0 12px 20px 0px var(--bg_color);
                            position: relative;
                            border: 1px solid var(--text_color_smooth);
                            background-color: var(--bg_color);
                            transition: $transition_default;
                            img{
                                object-fit: cover;
                                width: 100%;
                                transition: $transition_default;
                                display: block;
                                @media(max-width:$br_mobile){
                                    width: 100%;
                                }
                            }
                            .placeholder-logo{
                                height: 100px;
                                width: 100px;
                                margin-block: 140px;
                                object-fit: contain;
                                animation: rotate 2s infinite linear;
                            }
                        }
                    }
                    &__body{
                        position: relative;
                        width: 100%;
                        transition: $transition_default;
                        &__title{
                            font-size: $size_20px;
                            font-weight: 600;
                            margin-block: 20px 8px;
                            line-height: $size_28px;
                        }
                        &__subtitle{
                            font-size: $size_14px;
                            font-family: $font_tertiary;
                            margin:0;
                            padding-block: 4px;
                            font-weight: normal;
                            color: var(--text_color_smooth);
                            text-transform: uppercase;
                        }
                    }
                    &__footer{
                        position: relative;
                        width: 100%;
                        transition: $transition_default;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 20px;
                        &__tags{
                            margin-block: 20px;
                            display: flex;
                            gap: 8px;
                            flex-wrap: wrap;
                            &__item{
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
                }
            }
        }
    }
}

.project-title-link {
    text-decoration: none;
    color: inherit;
    display: inline;
}
</style>
