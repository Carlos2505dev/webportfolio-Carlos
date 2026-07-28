<template>
    <section class="about__section section">
        <div class="about__section__container container">
            <h2 class="small-title">
                {{ $t(about.title) }}
            </h2>
            <h3 class="large-title">
                {{ $t(about.subTitle) }}
            </h3>



            <div class="about__section__container__columns">

                <div class="about__section__container__columns__avatar">
                    <figure class="about__section__container__columns__avatar__image">

                        <NuxtImg v-if="colorMode.value == 'dark'" :alt="$t('common.photo_alt_extended')"
                            src="/darkmode.webp" width="800px" height="800px" format="webp"
                            densities="x1 x2" quality="100" loading="lazy" />

                        <NuxtImg v-if="colorMode.value == 'light'" :alt="$t('common.photo_alt_extended')"
                            src="/lightmode.webp" width="800px" height="800px" format="webp"
                            densities="x1 x2" quality="100" loading="lazy" />

                        <strong class="about__section__container__columns__avatar__image__areas logic">
                            <span>
                                <AppIcon class="smooth-move" IconName="carlos-icon:logic-side" />
                                {{ $t('about.logic_label') }}
                            </span>
                        </strong>
                        <strong class="about__section__container__columns__avatar__image__areas creativity">
                            <span>
                                {{ $t('about.creativity_label') }}
                                <AppIcon class="slide-top" IconName="carlos-icon:creative-side" />
                            </span>
                        </strong>
                    </figure>


                </div>



                <div class="about__section__container__columns__text">
                    <p v-html="$t('about.paragraph_1')" />
                    <br />
                    <p v-html="$t('about.paragraph_2')" />
                    <br />
                    <p v-html="$t('about.paragraph_3')" />
                </div>

            </div>

            <div class="about__section__container__stacks">
                <strong>
                    {{ $t(about.tools) }}
                </strong>
                <AppStackSkills :stacks="stackLogos" />
            </div>

            <div class="about__section__container__buttons">
                <AppButton :aria-label="$t(about.cta1)" class="primary" hasLink="/#contact">
                    {{ $t(about.cta1) }}
                </AppButton>
                <AppButton :aria-label="$t(about.cta2)" class="outline" target="_new" :hasLink="$t(about.cta2Link)">
                    {{ $t(about.cta2) }}
                    <AppIcon IconName="carlos-icon:arrow-up-right" />
                </AppButton>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, reactive, computed } from '#imports'

const colorMode = useColorMode()
const stackLogos = computed(() => [
    {logo: 'devicon:figma', name: 'Figma'},
    {logo: 'devicon:canva', name: 'Canva'},
    {logo: 'devicon:javascript', name: 'Javascript'},
    {logo: 'devicon:typescript', name: 'Typescript'},
    {logo: 'devicon:html5', name: 'HTML 5'},
    {logo: 'devicon:css3', name: 'CSS 3'},
    {logo: 'devicon:react', name: 'React.JS | React Native'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:expo' : 'logos:expo-icon', name: 'Expo'},
    {logo: 'devicon:tailwindcss', name: 'Tailwind CSS'},
    {logo: 'devicon:sass', name: 'Sass'},
    {logo: 'logos:supabase-icon', name: 'Supabase'},
    {logo: colorMode.value === 'dark' ? 'carlos-icon:mysql' : 'devicon:mysql', name: 'MySQL'},
    {logo: 'carlos-icon:postgresql', name: 'PostgreSQL'},
    {logo: 'logos:visual-studio-code', name: 'Visual Studio Code'},
    {logo: 'devicon:git', name: 'Git'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:github' : 'devicon:github', name: 'GitHub'},
    {logo: 'carlos-icon:vitejs', name: 'Vite'},
    {logo: 'carlos-icon:claude-color', name: 'Claude Code'},
    {logo: 'carlos-icon:codex', name: 'Codex | ChatGPT'},
    {logo: 'carlos-icon:antigravity', name: 'Google Antigravity'},
    {logo: 'carlos-icon:trae', name: 'TRAE AI'},
    {logo: 'carlos-icon:lovable', name: 'Lovable'},
    {logo: 'carlos-icon:replit', name: 'Replit'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:vercel' : 'logos:vercel-icon', name: 'Vercel'},
    {logo: colorMode.value === 'dark' ? 'carlos-icon:app-store-white' : 'carlos-icon:app-store-mono', name: 'Apple Store'},
    {logo: 'carlos-icon:google-play', name: 'Google Play Store'},
    {logo: 'carlos-icon:revenuecat', name: 'RevenueCat'},
])

const about = reactive({
    title: 'about.title',
    subTitle: 'about.subtitle',
    tools: 'about.tools',
    cta1: 'about.cta_1',
    cta2: 'about.cta_2',
    cta2Link: 'about.cta_2_link'
})
</script>

<style lang="scss" scoped>
.about__section{
    padding-block: 80px;
    &__container{
        max-width: 920px;
        display: grid;
        position: relative;
        .small-title, .large-title{
            text-align: center;
            max-width: 600px;
            margin: auto;
        }
        &__stacks{
            margin-block: 40px;
            font-family: $font_secondary;
            text-transform: uppercase;
            font-size: $size_16px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            strong{
                font-weight: 300;

            }
        }
        &__columns{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-block: 40px;
            @media(max-width: $br_tablet){
                grid-template-columns: 1fr;
            }
            &__avatar{
                margin-block: 20px;
                position: relative;
                display: grid;
                place-items: center;
                &__image{
                    border-radius: 20px;
                    background-color: var(--primary);
                    aspect-ratio: 1;
                    position: relative;
                    display: grid;
                    place-items: center;
                    transition: $transition_default;
                    max-width: 300px;
                    &__areas{
                        position: absolute;
                        display: grid;
                        place-items: center;
                        color: var(--text_color);
                        z-index: 2;
                        span{
                            display: flex;
                            gap: 4px;
                            flex-direction: column;
                            transition: $transition_default;
                            text-align: center;
                            font-family: $font_secondary;
                            text-transform: uppercase;
                        }
                        i{
                            font-size: 168px;
                        }
                        &.logic{
                            transform: translate( -132%, 40%);
                            
                        }
                        &.creativity{
                            transform: translate(90%, -40%);
                        }
                    }
                    

                    img{
                        position: relative;
                        display: block;
                        z-index: 2;
                        max-width: 300px;
                        max-height: 300px;
                        transition: $transition_default;
                        border-radius: 12px;
                        object-fit: cover;
                        min-width: 100%;
                        min-height: 100%;
                    }
                }

            }
            &__text{
                margin-block: 24px;
                position: relative;
                
                @media(max-width: $br_tablet){
                    text-align: center;
                }
                p{
                    font-size: $size_16px;
                    line-height: $size_32px;
                    margin: 0;
                    strong{
                        font-weight: 500;
                    }
                }
            }
        }
        &__buttons{
            display: flex;
            justify-content: center;
            gap: 20px;
            padding-block: 40px;
            flex-wrap: wrap;
            i{
                font-size: $size_24px;
            }
            @media(max-width: $br_mobile){
                justify-content: center;
                .button{
                    min-width: 90%;
                }
            }
        }
    }
}
</style>
