<template>
    <section class="contact section">
        <div class="contact__cta">
            <div class="contact__cta__logo">
                <NuxtImg src="/images/logo_cn.png" alt="Logo Carlos Neto" width="100" height="100" />
            </div>
            <h2 class="contact__cta__title large-title">
                {{ $t(contact.title) }}
            </h2>
            <p class="contact__cta__subtitle">
                {{ $t(contact.subtitle) }}
            </p>
            <div class="contact__cta__buttons">

                <AppButton class="primary lg" hasLink="mailto:carlosbezerrajr2007@gmail.com">
                    {{ $t(contact.button) }}
                    <AppIcon IconName="carlos-icon:arrow-up-right" />
                </AppButton>
            </div>

            <ul class="contact__cta__social">
                <li class="contact__cta__social__item">
                    <NuxtLink aria-label="Linkedin"
                        to="https://www.linkedin.com/in/carlosbezerraneto/" target="_new">
                        <AppIcon IconName="bxl:linkedin" /> <span class="visually-hidden">Linkedin</span>
                    </NuxtLink>
                </li>
                <li class="contact__cta__social__item">
                    <NuxtLink aria-label="GitHub" to="https://github.com/Carlos2505dev" target="_new">
                        <AppIcon IconName="bxl:github" /> <span class="visually-hidden">GitHub</span>
                    </NuxtLink>
                </li>
                <li class="contact__cta__social__item">
                    <NuxtLink aria-label="Instagram" to="https://www.instagram.com/crismart_design_dev" target="_new">
                        <AppIcon IconName="bxl:instagram-alt" /> <span class="visually-hidden">Instagram</span>
                    </NuxtLink>
                </li>
                <li class="contact__cta__social__item">
                    <NuxtLink aria-label="Whatsapp" to="https://wa.me/5571987848522" target="_new">
                        <AppIcon IconName="bxl:whatsapp" /> <span class="visually-hidden">Whatsapp</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { reactive, useI18n } from '#imports'
const { locale } = useI18n()

const contact = reactive({
    title: 'contact.title',
    subtitle: 'contact.subtitle',
    button: 'contact.cta'
})
</script>

<style lang="scss" scoped>
.contact{
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background-color: var(--primary);
    overflow: hidden;
    &__cta{
        padding-block: 120px;
        text-align: center;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 580px;
        margin: auto;
        &__logo{
            color: var(--pure_black);
            padding-block: 40px;
            img {
                animation: rotate 4s infinite linear;
                width: 100px;
                height: 100px;
                object-fit: contain;
            }
        }
        &__title{
            color: var(--pure_black);
            font-weight: 600;
            font-size: $size_60px;
            line-height: $size_64px;
        }
        &__subtitle{
            font-weight: normal;
            font-size: $size_20px;
            color: var(--pure_black);
            margin-bottom: 40px;
        }
        &__buttons{
            display: flex;
            gap: 20px;
            i{
                font-size: $size_28px;
            }
        }

                &__social {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 20px;
                    margin-block: 40px;
        
                    @media(max-width: $br_mobile) {
                        justify-content: center;
                    }
        
                    &__item {
                        a {
                            display: flex;
                            gap: 12px;
                            font-size: $size_28px;
                            color: var(--pure_black);
                            transition: $transition_default;
        
                            &:hover {
                                transform: scale(1.2);
                            }
                        }
        
                        &.email {
                            display: none;
        
                            @media(max-width: $br_mobile) {
                                display: flex;
                            }
                        }
                    }
                }
    }
}
</style>