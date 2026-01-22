<template>
    <section class="portfolio__section section">
        <div class="portfolio__section__container">
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
                            <h3 class="portfolio__section__container__projects__item__contain__body__title">
                                {{ project.name }}
                            </h3>
                            <h4 class="portfolio__section__container__projects__item__contain__body__subtitle">
                                {{ project.client }}
                            </h4>
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

// function prevProj(){
//     if(selectedProj.value > 0 ){
//         selectedProj.value = selectedProj.value - 1
//         return goToProj(selectedProj.value)
//     }else{
//         selectedProj.value = projects.value.length - 1
//         return goToProj(selectedProj.value)
//     }
// } 
// function nextProj() {
//     console.log(selectedProj.value)
//     if(selectedProj.value < projects.value.length - 1 ){
//         selectedProj.value = selectedProj.value + 1
//         return goToProj(selectedProj.value)
//     }else{
//         selectedProj.value = 0
//         return goToProj(selectedProj.value)
//     }
// } 

// function goToProj(project) {
//     selectedProj.value = project
//     const scrollTo =  document.getElementById(project)
//     scrollTo.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
// }


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
                            i{
                                height: 380px;
                                font-size: 100px;
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
                        .button{
                            margin-block: 24px;

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
                   
                    
                }
            }
        }
    }
}
</style>