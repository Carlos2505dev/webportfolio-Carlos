<template>
    <section class="services__section section">
        <div class="services__section__container container">
            <div class="services__section__container__column">
                <div class="services__section__container__column__selection">

                    <div class="services__section__container__column__selection__text">
                        <h2 class="small-title">
                            {{ $t(services.title) }}
                        </h2>
                        <h3 class="large-title">
                            {{ $t(services.subTitle) }}
                        </h3>
                        <p>
                            {{ $t(services.text) }}
                        </p>
                    </div>
                    <!-- <HomeServicesDetails /> -->
                </div>
                <ul ref="container" class="services__section__container__column__details">
                    <li v-for="service in services.list" :key="service.id"
                        class="services__section__container__column__details__item">
                        <article class="services__section__container__column__details__item__contain" to="/services">
                            <header class="services__section__container__column__details__item__contain__header">
                                <figure>
                                    <AppIcon :IconName="$t(service.icon)" />
                                </figure>
                                <!-- <AppIcon IconName="carlos-icon:arrow-up-right" /> -->
                            </header>
                            <div class="services__section__container__column__details__item__contain__content">
                                <h4>
                                    {{ $t(service.title) }}
                                </h4>
                                <p>
                                    {{ $t(service.description) }}
                                </p>
                                <ul class="services__section__container__column__details__item__contain__content__tags">
                                    <li v-for="tag in service.tags" :key="tag"
                                        class="services__section__container__column__details__item__contain__content__tags__item">
                                        {{ tag }}
                                    </li>
                                </ul>
                            </div>
                            <footer class="services__section__container__column__details__item__contain__footer">
                                <AppIcon :IconName="service.image" />

                            </footer>
                        </article>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive} from '#imports'

let services = reactive({
    title: 'services.title',
    subTitle: 'services.subtitle',
    text: 'services.text',
    list: [
        {
            title: 'services.service_1.title',
            icon: 'services.service_1.icon',
            description: 'services.service_1.text',
            image: 'carlos-icon:tablet',
            tags: ['Branding', 'Visual Identity', 'Digital illustration']
        },
        {
            title: 'services.service_2.title',
            icon: 'services.service_2.icon',
            description: 'services.service_2.text',
            image: 'carlos-icon:desktop',
            tags: ['Software', 'Landing Pages', 'Ecommerce', 'Website', 'Responsive Web Design', 'UI/UX Development']
        },
        {
            title: 'services.service_3.title',
            icon: 'services.service_3.icon',
            description: 'services.service_3.text',
            image: 'carlos-icon:mobile',
            tags: ['Mobile App Design', 'Hybrid UI/UX Development']
        }
    ]
})

</script>

<style lang="scss" scoped>
.services__section{
    padding-block: 80px;
    z-index: 1;
    position: relative;
    &__container{
        display: flex;
        gap: 40px;
        @media(max-width:$br_mobile){
            flex-direction: column;
            gap: 20px;
        }
        
        &__column{
            display: flex;
            gap: 40px;
            flex-direction: column;
            width: 100%;
            
            @media(max-width: $br_tablet) {
                flex-direction: column;
            }
            &__selection{
                position: relative;
                display: flex;
                
                &__text{
                    max-width: 500px;
                    // padding-block: 40px;
                    h3 {
                        position: relative;
                        z-index: 2;
                        margin-bottom: 40px;
                    }
                }
            }

            &__details{
                position: relative;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 28px;
                // flex-direction: column;
                @media (max-width: $br_tablet){
                    grid-template-columns: 1fr;
                }
                &__item{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    color: var(--text_color);
                    border: 1px solid var(--text_color_transparent);
                    background-color: var(--bg_color);
                    transition: $transition_default;
                    border-radius: 12px;
                    overflow: hidden;
                    min-height: 100%;
                    background: linear-gradient(0deg, var(--bg_color) 40%, var(--text_color_transparent) 100%);
                    
                    &:hover{
                        box-shadow: 0 0px 40px 0 var(--text_color_transparent);
                        transform: scale(1.08);
                        @media(max-width: $br_tablet) {
                            transform: none;
                            box-shadow: none;
                        }
                        footer{
                            i{
                                transform: translateX(0) translateY(0);
                                font-size: 160px;
                            }
                        }
                    }
                    &__contain{
                        display: flex;
                        row-gap: 24px;
                        flex-direction: column;
                        flex-grow: 1;
                        @media(max-width: $br_tablet) {
                            flex-direction: row;
                            align-items: center;
                        }
                        @media(max-width: $br_mobile) {
                            flex-direction: column;
                        }
                        
                        &__header{
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            padding: 24px;
                            z-index: 1;
                            i {
                                font-size: $size_28px;
                            }
                            figure{
                                // background-color: var(--text_color_transparent);
                                // box-shadow: inset -32px 32px 32px 0 var(--bg_color);
                                aspect-ratio: 1;
                                border-radius: 50%;
                                text-align: center;
                                display: grid;
                                place-items: center;
                                color: var(--text_color);
                                width: fit-content;
                                // height: 72px;
                                margin: 0;
                                transition: $transition_default;
                                i{
                                    font-size: 120px;
                                }
                            }
                            
                        }
                        &__content{
                            z-index: 1;
                            flex-grow: 1;
                            width: 100%;
                            padding: 0 24px;
                            @media(max-width: $br_tablet) {
                                padding-block: 24px;
                            }
                            @media(max-width: $br_mobile) {
                                padding: 0 24px;
                            }
                            h4{
                                font-size: $size_28px;
                                font-weight: 600;
                                margin: 0;
                                // font-family: $font_secondary;
                            }
                            p{
                                color: var(--text_color);
                            }
                            &__tags{
                                margin-top: 20px;
                                display: flex;
                                gap: 8px;
                                flex-wrap: wrap;
                                &__item{
                                    background-color: var(--text_color);
                                    color: var(--bg_color);
                                    border-radius: 8px;
                                    padding: 4px 8px;
                                    font-size: $size_12px;
                                    font-family: $font_secondary;
                                    text-transform: uppercase;
                                    font-weight: 600;
                                    // border: 1px solid var(--primary);
                                }
                            }
                        }
                        &__footer{
                            display: flex;
                            justify-content: center;
                            align-items: flex-end;
                            gap: -12px;
                            padding-inline: 24px;
                            max-height: 180px;
                            padding-bottom: 24px;
                            @media(max-width: $br_tablet) {
                                padding: 24px;
                                max-height: none;
                            }
                            i{
                                transition: $transition_default;
                                font-size: 280px;
                                opacity: 0.6;
                                color: var(--text_color);
                                transform: translateX(28%) translateY(48%);
                                @media(max-width: $br_tablet){
                                    transform: translateX(0) translateY(0);
                                        font-size: 160px;
                                }
                            }
                        }
                        
                    }
                    
                }
            }
        }
    }
}
</style>