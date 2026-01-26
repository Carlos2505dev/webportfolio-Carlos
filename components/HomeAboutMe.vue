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

                        <NuxtImg v-if="colorMode.value == 'dark'" alt="Foto de Carlos Neto"
                            src="/images/darkmode.png" width="800px" height="800px" format="webp"
                            densities="x1 x2" quality="100" />

                        <NuxtImg v-if="colorMode.value == 'light'" alt="Foto de Carlos Neto"
                            src="/images/lightmode.png" width="800px" height="800px" format="webp"
                            densities="x1 x2" quality="100" />

                        <strong class="about__section__container__columns__avatar__image__areas logic">
                            <span>
                                <AppIcon class="smooth-move" IconName="carlos-icon:logic-side" />
                                {{ locale == 'en' ? 'Logic' : 'Lógica' }}
                            </span>
                        </strong>
                        <strong class="about__section__container__columns__avatar__image__areas creativity">
                            <span>
                                {{ locale == 'en' ? 'Creativity' : 'Criatividade' }}
                                <AppIcon class="slide-top" IconName="carlos-icon:creative-side" />
                            </span>
                        </strong>
                    </figure>


                </div>



                <div v-if="locale == 'en'" class="about__section__container__columns__text">
                    <p>
                        Hi, I’m Cristopher—a seasoned <strong>Designer and Frontend Engineer</strong> from Brazil 🇧🇷
                        with <strong>over 12 years of experience</strong>. With a strong focus on UI/UX development, I
                        blend design and technology to craft cohesive and impactful projects that help businesses excel
                        in the digital world.
                    </p>
                    <br />
                    <p>
                        I specialize in designing and developing beautiful, user-friendly, and responsive websites and
                        applications. My keen eye for detail and commitment to innovation allow me to transform ideas
                        into intuitive and engaging digital experiences.
                    </p>
                    <br />
                    <p>
                        By combining creativity with technical expertise, I deliver solutions that not only captivate
                        users but also drive results. Let’s collaborate to create something exceptional!
                    </p>
                </div>
                <div v-else class="about__section__container__columns__text">
                    <p>
                        Olá, eu sou o Cristopher um <strong>Designer e Engenheiro Frontend</strong> experiente com
                        <strong>mais de 12 anos de experiência</strong>. Com um forte foco no desenvolvimento voltado
                        para <strong>UI/UX</strong>, eu combino design e tecnologia para criar projetos coesos e
                        impactantes que ajudam empresas a se destacarem no mundo digital.
                    </p>
                    <br />
                    <p>
                        Sou especializado no design e desenvolvimento de sites e aplicações bonitas, intuitivas e
                        responsivas. Meu olhar atento aos detalhes e comprometimento com a inovação me permitem
                        transformar ideias em experiências digitais intuitivas e envolventes.
                    </p>
                    <br />
                    <p>
                        Combinando criatividade e expertise técnica, entrego soluções que não apenas cativam os
                        usuários, mas também geram resultados. Vamos colaborar e criar algo excepcional juntos!
                    </p>
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
import { ref, useI18n, reactive, computed } from '#imports'

const colorMode = useColorMode()
const { locale } = useI18n()
const stackLogos = computed(() => [
    {logo: 'devicon:figma', name: 'Figma'},
    {logo: 'devicon:canva', name: 'Canva'},
    {logo: 'devicon:javascript', name: 'Javascript'},
    {logo: 'devicon:typescript', name: 'Typescript'},
    {logo: 'devicon:html5', name: 'HTML 5'},
    {logo: 'devicon:css3', name: 'CSS 3'},
    {logo: 'devicon:react', name: 'React.JS'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:expo' : 'logos:expo-icon', name: 'Expo'},
    {logo: 'devicon:tailwindcss', name: 'Tailwind CSS'},
    {logo: 'devicon:sass', name: 'Sass'},
    {logo: 'logos:supabase-icon', name: 'Supabase'},
    {logo: 'logos:visual-studio-code', name: 'Visual Studio Code'},
    {logo: 'devicon:git', name: 'Git'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:github' : 'devicon:github', name: 'GitHub'},
    {logo: colorMode.value === 'dark' ? 'simple-icons:openai' : 'logos:openai-icon', name: 'ChatGPT'},
    {logo: 'carlos-icon:claude-color', name: 'Claude Code'},
    {logo: 'simple-icons:cursor', name: 'Cursor'},
    {logo: 'carlos-icon:antigravity', name: 'Google Antigravity'}
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
                    // background: var(--secondary_gradient);
                    // overflow: hidden;
                    aspect-ratio: 1;
                    position: relative;
                    display: grid;
                    place-items: center;
                    transition: $transition_default;
                    max-width: 300px;
                    // animation: pulse 2s ease infinite;
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
                            // font-weight: normal;
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