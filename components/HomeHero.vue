<template>
    <section class="hero__section section">
        <div class="hero__section__container container">

            <div class="hero__section__container__greetings">
                <div class="hero__section__container__greetings__avatar">
                    <NuxtLink :aria-label="$t(heroHome.cta)" to="/#about">
                        <NuxtImg alt="Carlos Neto" src="/images/carlosbezerra.png" width="200px"
                            height="200px" format="webp" quality="100" densities="x1 x2" preload />
                    </NuxtLink>
                </div>
            </div>
            <div class="hero__section__container__text">
                <div class="hero__section__container__text">
                    <h1 class="hero__section__container__text__name small-title">
                        {{ $t(heroHome.title) }}
                    </h1>
                </div>
                <div class="hero__section__container__text__wrapper">
                    <h2 class="hero__section__container__text__wrapper__title gradient-font">
                        {{ $t(heroHome.subTitle) }}
                    </h2>
                    <div class="hero__section__container__text__wrapper__buttons">
                        <AppButton :aria-label="$t(heroHome.button)" hasLink="/#services" class="primary">
                            {{ $t(heroHome.button) }}
                            <AppIcon IconName="carlos-icon:arrow-right" />
                        </AppButton>
                        <AppButton :aria-label="$t(heroHome.buttonResume)" hasLink="/resume.pdf" target="_blank" class="outline">
                            {{ $t(heroHome.buttonResume) }}
                            <AppIcon IconName="ph:download-simple-bold" />
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import { reactive } from '#imports'

const stackLogos = ref([
    { logo: 'devicon:figma', name: 'Figma' },
    // {logo: 'devicon:sketch', name: 'Sketch'},
    { logo: 'skill-icons:xd', name: 'Adobe Xd' },
    { logo: 'skill-icons:photoshop', name: 'Adobe Photoshop' },
    { logo: 'skill-icons:illustrator', name: 'Adobe Illustrator' },
    { logo: 'devicon:javascript', name: 'Javascript' },
    { logo: 'devicon:typescript', name: 'Typescript' },
    { logo: 'devicon:html5', name: 'HTML 5' },
    { logo: 'devicon:css3', name: 'CSS 3' },
    { logo: 'devicon:sass', name: 'Sass' },
    { logo: 'devicon:bootstrap', name: 'Bootstrap' },
    { logo: 'devicon:jquery', name: 'JQuery' },
    { logo: 'skill-icons:wordpress', name: 'Wordpress' },
    { logo: 'logos:shopify', name: 'Shopify' },
    { logo: 'devicon:vuejs', name: 'Vue.JS' },
    { logo: 'devicon:vuetify', name: 'Vuetify' },
    { logo: 'logos:nuxt-icon', name: 'Nuxt.JS' },
    { logo: 'devicon:react', name: 'React.JS' },
    { logo: 'devicon:nextjs', name: 'Next.JS' },
    { logo: 'devicon:tailwindcss', name: 'Tailwind CSS' },
    { logo: 'devicon:flutter', name: 'Flutter' },
    { logo: 'logos:visual-studio-code', name: 'Visual Studio Code' },
    { logo: 'devicon:bitbucket', name: 'Bitbucket' },
    { logo: 'devicon:github', name: 'GitHub' },
    { logo: 'devicon:gitlab', name: 'GitLab' }
    // {logo: 'logos:blender', name: 'Blender'},
])


const heroHome = reactive({
    cta: 'hero.cta',
    title: 'hero.title',
    subTitle: 'hero.subtitle',
    text: 'hero.text',
    button: 'hero.button',
    buttonResume: 'hero.button_resume'
})
</script>
  
<style lang="scss" scoped>
.hero__section{
    min-height: 90vh;
    min-height: 90dvh;
    display: grid;
    place-items: center;
    max-width: 100%;
    position: relative;
    padding-block: 120px;
    // &:before {
    //     content: '';
    //     background: var(--text_color_transparent);
    //     position: absolute;
    //     opacity: 0.4;
    //     top: 0%;
    //     left: 16%;
    //     width: 50%;
    //     height: 80%;
    //     border-radius: 100%;
    //     filter: blur(100px);
    //     box-shadow: 280px 20px 0 0 var(--text_color_smooth), 80px 280px 0 0 var(--text_color_transparent);
    // }
    &__container{
        flex-grow: 1;
        max-width: 980px;
        &__greetings {
            display: flex;
            gap: 0px;
            padding-block: 20px;
            @media(max-width: $br_mobile) {
                flex-direction: row;
                align-items: center;
            }
    
            &__avatar {
                width: 48px;
                border-radius: 48px;
                border: 2px solid var(--text_color);
                position: relative;
                height: 48px;
                display: grid;
                place-items: center;
                overflow: hidden;
    
                // animation: pulse 2s infinite ease;
                a {
                    display: grid;
                    place-items: center;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
    
                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
    
                    &:before {
                        content: '';
                        position: absolute;
                        height: 50%;
                        width: 100%;
                        bottom: -100%;
                        transition: $transition_default;
                        background: linear-gradient(0deg,
                                rgba(#8AED13, 0.8) 12%,
                                rgba(#8AED13, 0) 100%);
                    }
    
                    &:hover {
                        &:before {
                            bottom: 0;
                        }
                    }
                }
            }
        }
        &__text{
        position: relative;
        display: flex;
        gap: $size_32px;
        @media (max-width: $br_tablet){
            flex-direction: column;
        }
        
        &__wrapper{
            position: relative;
            z-index: 2;
            &__title{
                margin-block: 4px;
                font-size: $size_72px;
                font-weight: 600;
                @media(max-width:$br_mobile){
                    font-size: $size_60px;
                }
            }
            &__subtitle{
                font-size: $size_20px;
            }
            &__buttons{
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                margin-top: 40px;
            }
            .button{
                i{
                    font-size: $size_24px;
                }
            }
        }
        }
        &__image{
            position: absolute;
            z-index: -1;
        }
    }
    &__cta{
        display: grid;
        grid-template-columns: 454px 1fr;
        align-items: center;
        padding-block: 20px;
        @media(max-width:$br_tablet){
            grid-template-columns: 1fr;
        }
        p{
            font-size: $size_14px;
        }
        &__buttons{
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }
    }
}
</style>