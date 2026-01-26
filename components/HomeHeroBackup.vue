<template>
    <section class="hero__section section">
        <div class="hero__section__container container">
            <div class="hero__section__container__presentation">
                <ul class="hero__section__container__presentation__skills">
                    <li 
                        v-for="(skill, index) in hardSkills" 
                        :key="index"
                        class="hero__section__container__presentation__skills__item"
                        :class="'skill_' + index"
                    >
                        <span class="hero__section__container__presentation__skills__item__icon">
                            <AppIcon :IconName="skill.logo" />
                            <small>
                                {{ skill.title }}
                            </small>
                        </span>
                    </li>
                </ul>
                <NuxtLink 
                    :aria-label="$t(heroHome.cta)"
                    to="/#about" 
                    class="hero__section__container__presentation__button"
                >
                    <figure class="hero__section__container__presentation__button__avatar">
                        <NuxtImg 
                            alt="Foto de Carlos Neto"
                            src="/images/cristoon.svg"
                            width="60px"
                            height="84px"
                            format="webp"
                            quality="100"
                            densities="x1 x2"
                            preload
                        />
                    </figure>
                    <div>
                        <span>
                            {{ $t(heroHome.cta) }}
                        </span>
                    </div>
                </NuxtLink>
            </div>
            <div class="hero__section__container__text">
                <div class="hero__section__container__text__wrapper">
                    <p class="hero__section__container__text__wrapper__name small-title">
                        {{ $t(heroHome.title) }}
                    </p>
                    <h1 class="hero__section__container__text__wrapper__title gradient-font">
                        {{ $t(heroHome.subTitle) }}
                    </h1>
                    <AppButton 
                        :aria-label="$t(heroHome.button)"
                        hasLink="/#contact" 
                        class="primary"
                    >
                        {{ $t(heroHome.button) }}
                    </AppButton>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import { reactive } from '#imports'
const hardSkills = reactive([
    {logo: 'logos:figma', title: 'Figma'},
    {logo: 'logos:adobe-xd', title: 'Adobe Xd'},
    {logo: 'logos:adobe-photoshop', title: 'Adobe Photoshop'},
    {logo: 'logos:adobe-illustrator', title: 'Adobe Illustrator'},
    {logo: 'logos:javascript', title: 'Javascript'},
    {logo: 'logos:html-5', title: 'HTML 5'},
    {logo: 'logos:css-3', title: 'CSS 3'}
])

const heroHome = reactive({
    cta: 'hero.cta',
    title: 'hero.title',
    subTitle: 'hero.subtitle',
    button: 'hero.button'
})
</script>
  
<style lang="scss" scoped>
.hero__section{
    min-height: 90vh;
    min-height: 90dvh;
    display: grid;
    place-items: center;
    overflow: hidden;
    max-width: 100%;
    position: relative;
    &::before{
        position: absolute;
        content: '';
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: var(--bg_color);
        box-shadow: 0 -12px 20px 12px var(--bg_color);
    }
    &__container{
        padding-block: 16% 80px;
        flex-grow: 1;
        &__presentation{
            position: relative;
            display: grid;
            place-items: center;
            margin-bottom:32px;
            @media(max-width: $br_mobile){
                margin-top: 100px;
            }
            &__skills{
                position: absolute;
                display: grid;
                place-items: center;
                z-index: -1;
                &__item{
                    position: absolute;
                    aspect-ratio: 1;
                    border-radius: 100%;
                    border: 2px solid var(--text_color_transparent) ;
                    display: flex;
                    align-items: center;
                    &__icon{
                        aspect-ratio: 1;
                        font-size: 24px;
                        width: 44px;
                        display: grid;
                        place-items: center;
                        border-radius: 100%;
                        background-color: var(--neutral);
                        margin-left: -20px;
                        box-shadow: 0 4px 20px 0 var(--text_color_transparent), inset 8px -4px 32px 0 var(--bg_color);
                    }
                    small{
                        background-color: var(--tertiary);
                        opacity: 0;
                        position: absolute;
                    }
                    
                    --width: 16vw;
                    @media(max-width:$br_tablet){
                        --width: 30vw;
                    }
                    @for $i from 0 to 8 {
                        &:nth-child(10n + #{$i}) {
                            width: calc(#{$i} * var(--width));
                            transform: rotate(calc(#{$i} * 45deg));
                            animation: rotate infinite linear;
                            animation-duration: calc(20s - #{$i} * 1s);
                            @media(max-width:$br_mobile){
                                width: calc(18vw + #{$i} * 28vw);
                            }
                        }
                    }
                }
            }
            &__button{
                background-color: var(--bg_color);
                border: 0;
                border-radius: 100px;
                padding: 8px;
                display: flex;
                grid-template-columns: 2fr;
                align-items: center;
                position: relative;
                z-index: 8;
                animation: pulse 2s infinite ease;
                div{
                    transition: $transition_default;
                    display: grid;
                    grid-template-columns: 0fr;
                    span{
                        display: flex;
                        overflow: hidden;
                        transition: $transition_default;
                        white-space: nowrap;
                        color: var(--pure_white);
                    }
                }

                &:hover{
                    background-color: var(--tertiary);
                    figure{
                        width: 40px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    div{
                        grid-template-columns: 1fr;
                        span{
                        padding: 8px 20px 8px 8px;
                        }
                    }
                }
                
                
                &__avatar{
                    flex-shrink: 0;
                    width: 80px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    background-color: var(--secondary);
                    display: grid;
                    place-items: center;
                    margin: 0;
                    transition: $transition_default;
                    position: relative;
                    img{
                        position: absolute;
                        transition: $transition_default;
                    }
                }
            }
        }
        &__text{
        display: grid;
        place-items: center;
        position: relative;
        &__wrapper{
            display: grid;
            place-items: center;
            position: relative;
            z-index: 2;
            &:before{
                content: '';
                display: block;
                background-color: var(--bg_color);
                border-radius: 100%;
                width: 100%;
                height: 100%;
                filter: blur(40px);
                position: absolute;
                z-index: -1;
            }
            &__name{
                text-align: center;
                @media(max-width:$br_mobile){
                    letter-spacing: 4px;
                }
            }
            &__title{
                margin-block: 4px;
                font-size: $size_72px;
                text-align: center;
                font-weight: 600;
                @media(max-width:$br_mobile){
                    font-size: $size_60px;
                }
            }
            .button{
                margin-top: 40px;
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