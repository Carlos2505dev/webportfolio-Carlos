<template>
    <section id="clients" class="about__clients">
        
        <div class="about__clients__marquee">
            <ul class="about__clients__marquee__list container">
                <li 
                    v-for="client in latestWorks" 
                    :key="client.name"
                    class="about__clients__marquee__list__item"
                >
                    <figure>
                        <NuxtImg 
                            :src="client.image"
                            width="340px"
                            height="340px"
                            :alt="client.name"
                            :title="client.name"
                            format="webp"
                            densities="x1 x2"
                            quality="100"
                            placeholder
                        />
                    </figure>
                </li>
            </ul>
            <ul class="about__clients__marquee__list container" aria-hidden="true">
                <li 
                    v-for="client in latestWorks" 
                    :key="client.name"
                    class="about__clients__marquee__list__item"
                >
                    <figure>
                        <NuxtImg 
                            :src="client.image"
                            width="340px"
                            height="340px"
                            :alt="client.name"
                            :title="client.name"
                            format="webp"
                            densities="x1 x2"
                            quality="100"
                            placeholder
                        />
                    </figure>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { reactive, useI18n } from '#imports'
const { locale } = useI18n()

import portfolio from '@/localData/portfolio'

const latestWorks = computed(() => {
    const projects = portfolio[locale.value]
    const last8Items = projects
    return last8Items.reverse()
})
</script>

<style lang="scss" scoped>

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
.about__clients{
    padding: 0;
    @media(max-width: $br_mobile){
        text-align: center;
    }
    &__title{
        font-size: $size_12px;
        font-weight: normal;
        margin-block: 12px;
        color: var(--text_color_smooth);
    }
    &__marquee{
        --gap: 16px;
        position: relative;
        display: flex;
        overflow: hidden;
        user-select: none;
        // gap: var(--gap);
        @media(max-width:$br_mobile){
            margin-inline: 20px;
        }
        // &:before, &:after{
        //     content: '';
        //     position: absolute;
        //     height: 100%;
        //     width: 20px;
        //     border-radius: 80px;
        //     background-color: var(--bg_color);
        //     box-shadow: 0 0 12px 12px var(--bg_color);
        //     top: 0;
        //     z-index: 2;
        //     @media(max-width:$br_mobile){
        //         display: none;
        //     }
        // }
        &:before{
            left: 0;
        }
        &:after{
            right: 0;
        }
        &__list{
            display: flex;
            width: 8000px;
            justify-content: space-around;
            align-items: center;
            // padding-block: 12px;
            // gap: var(--gap);
            min-width: 100%;
            flex-shrink: 0;
            animation: 12s scroll infinite linear;
            @media(max-width:$br_mobile){
                animation: none;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            &__item{
                display: grid;
                width: 100%;
                place-items: center;
                transition: $transition_default;
                // background-color: var(--bg_color_smooth);
                border-radius: 20px;
                // border: 1px solid var(--text_color_transparent);
                @media(max-width:$br_mobile){
                    max-width: 100px;
                }
                figure{
                    transition: $transition_default;
                    display: block;
                    img{
                        display: block;
                        max-height: 300px;
                        width: auto;
                        height: auto;
                    }
                }
            }
        }
    }
}
</style>