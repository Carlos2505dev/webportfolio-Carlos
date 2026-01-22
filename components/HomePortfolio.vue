<template>
    <section class="portfolio__section">
        <div class="portfolio__section__container">
            <header class="portfolio__section__container__header">
                <h2 class="small-title">
                    {{ $t(portfolio.title) }}
                </h2>
            </header>
            <ul class="portfolio__section__container__projects">
                <li v-for="(project, index) in projects" :id="index" :key="project.id"
                    class="portfolio__section__container__projects__item" @touchstart="setDragStart"
                    @touchend="swipeSlider">
                    <div :class="{ active : selectedProj == index }"
                        class="portfolio__section__container__projects__item__contain" @click="goToProj(project.id)">
                        <header class="portfolio__section__container__projects__item__contain__header project-image">
                            <picture class="portfolio__section__container__projects__item__contain__header__picture"
                                @click="viewDetails(index, project.name)">
                                <NuxtImg :alt="project.name" :src="project.image"
                                    sizes="100vw sm:380px md:400px lg:800px" quality="100" densities="x1 x2"
                                    :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                                    <!-- Show the actual image when loaded -->
                                    <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

                                    <!-- Show a placeholder while loading -->
                                    <AppIcon v-else IconName="carlos-icon:logo-symbol-outline" />
                                    <!-- <img v-else src="https://placehold.co/400x400" alt="placeholder" /> -->
                                </NuxtImg>
                            </picture>

                        </header>

                        <div class="portfolio__section__container__projects__item__contain__body project-titles">
                            <h2 class="portfolio__section__container__projects__item__contain__body__title">
                                {{ project.name }}
                            </h2>
                            <h3 class="portfolio__section__container__projects__item__contain__body__subtitle">
                                {{ project.client }}
                            </h3>
                        </div>
                        <footer class="portfolio__section__container__projects__item__contain__footer project-titles">
                            <ul class="portfolio__section__container__projects__item__contain__footer__tags">
                                <li v-for="tag in project.tags" :key="tag"
                                    class="portfolio__section__container__projects__item__contain__footer__tags__item">
                                    {{ tag }}
                                </li>
                            </ul>

                        </footer>
                    </div>
                </li>
            </ul>
            <div class="section">
                <div class="portfolio__section__container__projects__navigation container">
                    <ul class="portfolio__section__container__projects__navigation__arrows">
                        <li class="portfolio__section__container__projects__navigation__arrows__item left-arrow">
                            <AppButton aria-label="Previous" class="primary" @click="prevProj">
                                <AppIcon IconName="ph:arrow-left" />
                            </AppButton>
                        </li>
                        <li class="portfolio__section__container__projects__navigation__arrows__item right-arrow">
                            <AppButton aria-label="Next" class="primary" @click="nextProj">
                                <AppIcon IconName="ph:arrow-right" />
                            </AppButton>
                        </li>
                    </ul>
                    <ul class="portfolio__section__container__projects__navigation__bullets">
                        <li v-for="(project, index) in projects" :key="project.id"
                            class="portfolio__section__container__projects__navigation__bullets__item">
                            <button :aria-label="project.name" :class="{ active : selectedProj == index }"
                                @click="goToProj(index)">
                                <span class="visually-hidden">
                                    {{ project.name }}
                                </span>
                            </button>
                        </li>
                    </ul>
                    <AppButton class="outline" hasLink="/portfolio">
                        {{ $t(portfolio.button) }}
                        <AppIcon IconName="carlos-icon:arrow-right" />
                    </AppButton>
                </div>
            </div>

            <HomePortfolioProjectModal :projectDetails="openedDetails" :openedModal="showModal"
                @close:modal="closeModal" />

        </div>
    </section>
</template>

<script setup>
import { ref, toRefs, computed, watch } from '#imports'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    projects: {
        type: Object,
        required: true
    }
})
const { projects } = toRefs(props)

const selectedProj = ref(0)

function prevProj(){
    if(selectedProj.value > 0 ){
        selectedProj.value = selectedProj.value - 1
        return goToProj(selectedProj.value)
    }else{
        selectedProj.value = projects.value.length - 1
        return goToProj(selectedProj.value)
    }
} 
function nextProj() {
    console.log(selectedProj.value)
    if(selectedProj.value < projects.value.length - 1 ){
        selectedProj.value = selectedProj.value + 1
        return goToProj(selectedProj.value)
    }else{
        selectedProj.value = 0
        return goToProj(selectedProj.value)
    }
} 

function goToProj(project) {
    selectedProj.value = project
    const scrollTo =  document.getElementById(project)
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

const dragStartPosition = ref(null)

function setDragStart(event) {
    dragStartPosition.value = event.changedTouches[0].clientX ?? event.clientX
}
function swipeSlider(event) {
    const touchPosition = parseInt(event.changedTouches[0].clientX) ?? parseInt(event.clientX)
    if(Math.abs(touchPosition - dragStartPosition.value) > 20) {
        if(touchPosition > dragStartPosition.value) {
            prevProj()
            return
        }
        nextProj()
    }   
}

const portfolio = {
    title: 'portfolio.title',
    button: 'portfolio.button'
}


const modalName = ref(null)
const showModal = computed(() => modalName.value !== null)
const modalContent = ref(null)

const openedDetails = ref(projects.value)

const sanitizeName = (name) =>  name.toLowerCase().replace(/\s+/g, '-')

function viewDetails(index, name) {
    const sanitizedName = sanitizeName(name)
    modalName.value = sanitizedName

    // Find the project by matching sanitizedName
    const project = projects.value.find(
        (proj) => sanitizeName(proj.name) === sanitizedName
    )

    if (project) {
        modalContent.value = project
        openedDetails.value = project
        selectedProj.value = index
    } else {
        modalContent.value = 'Content not found'
    }

    router.push({ query: { project: sanitizedName } })
}

function closeModal() {
    modalName.value = null
    const { project, ...rest } = route.query
    router.push({ query: rest })
    const projectIndex = projects.value.findIndex(item => item.id === openedDetails.value.id)
    showModal.value = false
    selectedProj.value = projectIndex
    goToProj(selectedProj.value)
}

const initializeModalFromQuery = () => {
    if (route.query.project) {
        const modalFromQuery = route.query.project

        // Find the project by matching sanitizedName
        const project = projects.value.find(
            (proj) => sanitizeName(proj.name) === modalFromQuery
        )

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
            const project = projects.value.find(
                (proj) => sanitizeName(proj.name) === newModal
            )

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

// Initialize modal on page load
initializeModalFromQuery()

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
        &__header{
            position: absolute;
            z-index: 4;
            padding: 0 0 40px 40px;
            height: 100%;
            @media(max-width:$br_mobile){
                padding: 0 0 40px 0;
                position: relative;
                text-align: center;
            }
            h2{
                writing-mode:vertical-rl;
                transform: rotate(-180deg);
                // position: sticky;
                // top: 140px;
                @media(max-width:$br_mobile){
                    writing-mode:horizontal-tb;
                    transform: rotate(0);
                }
            }
            p{
                font-size: 20px;
            }
        }
        &__projects{
            padding-inline: 140px;
            overflow: auto;
            display: flex;
            justify-content: flex-start;
            gap: 20px;
            position: relative;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            &::-webkit-scrollbar {
                display: none;
            }
            @media(max-width:$br_mobile){
                margin: 0;
                padding-inline: calc(3% + 20px);
            }
            &__item{
                flex-shrink: 0;
                position: relative;
                margin-inline: -28px;
                max-width: 380px;
                width: 100%;
                @media(max-width:$br_mobile){
                    max-width: 380px;
                    // max-width: 98%;
                    margin-inline: -12px;
                }
                &:hover{
                    > div{
                        z-index: 4;
                        transform: scale(0.84) translateY(5vh);
                        @media(max-width:$br_mobile){
                            z-index: 1;
                        }
                        picture{
                            box-shadow: 0 40px 80px 80px var(--bg_color);
                        }
                        .project-titles{
                            opacity: 1;
                            top: 0;
                        }
                        &.active{
                            transform: none;
                            z-index: 2;
                        }
                    }
                }
                &__contain{
                    display: block;
                    transform: scale(0.84);
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
                            
                            img{
                                object-fit: cover;
                                max-width: 100%;
                                max-height: 100%;
                                width: 100%;
                                transition: $transition_default;
                                display: block;
                            }
                            i {
                                height: 380px;
                                font-size: 100px;
                                animation: rotate 2s infinite linear;
                            }
                        }
                    }
                    &__body{
                        opacity: 0;
                        position: relative;
                        width: 100%;
                        top: -40px;
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
                        .button{
                            margin-block: 24px;

                        }
                    }
                    &__footer{
                        opacity: 0;
                        position: relative;
                        width: 100%;
                        top: -40px;
                        transition: $transition_default;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 20px;
                        position: relative;
                        &__tags{
                            margin-block: 20px;
                            display: flex;
                            gap: 8px;
                            flex-wrap: wrap;
                            &__item{
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
                   
                    &.active{
                        transform: scale(1);
                        z-index: 2;
                        picture{
                            box-shadow: 0 40px 80px 80px var(--bg_color);
                        }
                        .project-titles{
                            opacity: 1;
                            top: 0;
                        }
    
                    }
                }
            }
            &__navigation{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-block: 40px;
                gap: 24px;
                @media(max-width: $br_mobile){
                    flex-direction: column;
                    padding-inline: 0;
                    margin-block: 20px;
                    gap: 40px;
                }
                &__arrows{
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    width: 100%;
                    position: absolute;
                    top: 28vh;
                    left: 0;
                    padding-inline: 40px;
                    &__item{
                        height: 100%;
                        top: 0;
                        display: grid;
                        place-items: center;
                        button{
                            font-size: $size_20px;
                            aspect-ratio: 1;
                        }
                        &.right-arrow{
                            right: 0;
                            z-index: 5;
                        }
                        &.left-arrow{
                            left: 0;
                            z-index: 5;
                        }
                    }
                    @media(max-width: $br_mobile) {
                        position: unset;
                        padding-inline: 0;
                    }
                }
                &__bullets{
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    @media (max-width: $br_mobile){
                        gap: 12px;
                    }
                    &__item{
                        button{
                            background-color: var(--text_color_transparent);
                            border: 0;
                            border-radius: 40px;
                            width: 8px;
                            height: 8px;
                            padding: 0;
                            transition: $transition_default;
                            &:hover{
                                background-color: var(--text_color_smooth);
                            }
                            &.active{
                                background-color: var(--primary);
                                width: 48px;
                                @media (max-width: $br_mobile){
                                    width: 8px;
                                }
                            }
                        }
                    }
                }
                .link{
                    color: var(--text_color);
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    &:hover{
                        color: var(--secondary);
                    }
                }
            }
        }
    }
}
</style>