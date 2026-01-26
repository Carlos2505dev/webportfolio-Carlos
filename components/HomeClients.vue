<template>
    <section id="clients" class="about__clients section">
        <h2 class="about__clients__title">
            {{ $t(client.title) }}
        </h2>
        <div class="about__clients__marquee">
            <ul class="about__clients__marquee__list container">
                <li v-for="client in clients" :key="client.name" class="about__clients__marquee__list__item" @click="toggleClient(client)">
                    <div class="client-content">
                        <figure v-if="!client.active">
                            <NuxtImg :src="client.image" width="140px" height="140px" :alt="'Logo da empresa ' + client.name"
                                :title="client.name" format="webp" densities="x1 x2" quality="100" placeholder />
                        </figure>
                        <span v-else class="client-name">{{ client.name }}</span>
                    </div>
                </li>
            </ul>
            <ul class="about__clients__marquee__list container" aria-hidden="true">
                <li v-for="client in clients" :key="client.name" class="about__clients__marquee__list__item" @click="toggleClient(client)">
                    <div class="client-content">
                        <figure v-if="!client.active">
                            <NuxtImg :src="client.image" width="140px" height="140px" :alt="'Logo da empresa ' + client.name"
                                :title="client.name" format="webp" densities="x1 x2" quality="100" placeholder />
                        </figure>
                        <span v-else class="client-name">{{ client.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { reactive, useI18n } from '#imports'
const { locale } = useI18n()
const clients = reactive([
    { name: 'AME', image: 'images/clients/AME.png', active: false },
    { name: 'Enjoy Brasil', image: 'images/clients/Enjoy Brasil.png', active: false },
    { name: 'InoveTech', image: 'images/clients/InoveTech.png', active: false },
    { name: 'Meu Maná', image: 'images/clients/Meu-Mana.png', active: false },
    { name: 'Confeitaria Dolce Amore', image: 'images/clients/DolceAmore.png', active: false },
])

const client = reactive({
    title: 'clients.title'
})

function toggleClient(client) {
    client.active = !client.active
}
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
    padding: 40px 0px;
    @media(max-width: $br_mobile){
        text-align: center;
    }
    &__title{
        font-size: $size_16px;
        font-weight: normal;
        margin-block: 12px;
        text-align: center;
        // font-family: $font_secondary;
        text-transform: uppercase;
        color: var(--text_color_smooth);
    }
    &__marquee{
        --gap: 16px;
        position: relative;
        display: flex;
        overflow: hidden;
        user-select: none;
        gap: var(--gap);
        @media(max-width:$br_mobile){
            margin-inline: 20px;
        }
        &:before{
            left: 0;
        }
        &:after{
            right: 0;
        }
        &__list{
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-block: 12px;
            gap: var(--gap);
            min-width: 100%;
            flex-shrink: 0;
            animation: 20s scroll infinite linear;
            @media(max-width:$br_mobile){
                animation: none;
                flex-wrap: wrap;
                justify-content: center;
            }
            &__item{
                display: grid;
                width: 100%;
                place-items: center;
                transition: $transition_default;
                // background-color: var(--bg_color_smooth);
                border-radius: 12px;
                border: 1px solid var(--text_color_transparent);
                cursor: pointer;
                overflow: hidden;
                
                @media(max-width:$br_mobile){
                    max-width: 100px;
                }
                
                &:hover {
                    border-color: var(--primary);
                }

                .client-content {
                    width: 100%;
                    height: 140px; /* Altura fixa para manter consistência */
                    display: grid;
                    place-items: center;
                    
                    @media(max-width:$br_mobile){
                        height: 100px;
                    }
                }

                figure{
                    opacity: 1;
                    transition: $transition_default;
                    display: block;
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    
                    img{
                        display: block;
                        max-height: 100px;
                        width: auto;
                        height: auto;
                        margin: auto;
                    }
                }

                .client-name {
                    font-family: $font_primary;
                    font-weight: 600;
                    font-size: $size_14px;
                    color: var(--text_color);
                    text-align: center;
                    padding: 8px;
                    
                    @media(max-width:$br_mobile){
                        font-size: $size_12px;
                    }
                }
            }
        }
    }
}
</style>