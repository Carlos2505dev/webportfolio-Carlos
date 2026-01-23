<template>
    <footer class="footer section">
        <div class="footer__copyright container">
            <p>
                {{ locale == 'en' ? 'Proudly designed and developed by' : 'Orgulhosamente criado e desenvolvido por' }}
                <NuxtLink aria-label="About" to="/#about">Carlos Neto</NuxtLink>
            </p>
            <p>
                © {{ currentYear }} carlosbezerrajr2007@gmail.com
            </p>
        </div>
    </footer>
</template>

<script setup>
import { reactive, useI18n } from '#imports'
const { locale } = useI18n()
const currentYear = new Date().getFullYear()

const contact = reactive({
    title: 'contact.title',
    subtitle: 'contact.subtitle',
    button: 'contact.cta'
})
</script>

<style lang="scss" scoped>
.footer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &__copyright{
        padding-block: 40px;
        display: flex;
        gap: 12px;
        justify-content: space-between;
        margin-block: 0;
        font-family: $font_secondary;
        z-index: 1;
        max-width: 980px;
        @media(max-width: $br_mobile){
            flex-direction: column;
            justify-content: center;
            margin-bottom: 80px;
            justify-content: center;
        }
        p{
            font-size:$size_16px;
            text-align: center;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 4px;
            @media(max-width: $br_mobile) {
                    justify-content: center;
            }
            i{
                font-size: $size_20px;
            }
            a{
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
}</style>