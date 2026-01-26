<template>
    <div class="about__skills">
        <div class="about__skills__container">
            <div class="about__skills__container__image">
                <picture class="about__skills__container__image__picture">

                    <NuxtImg src="/images/logo_cn.png" alt="Logo Carlos Neto" />
                    

                </picture>


            </div>
        </div>

    </div>
</template>

<script setup>
import { useI18n } from '#imports'
const { locale } = useI18n()

</script>

<style lang="scss" scoped>

.about__skills{
    // display: grid;
    grid-template-columns: repeat(10, 1fr);
    place-items: center;
    // height: 400px;
    position: relative;
    
    &__container{
        
        &__image{
            

            &__picture{
                // box-shadow: 0 0 80px 40px var(--secondary);
                
                img {
                    animation: rotate 4s infinite linear;
                    width: 280px;
                    height: 280px;
                    object-fit: contain;
                }
            }
        }
    }
}
</style>