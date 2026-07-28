<template>
    <section class="error__page section">
        <div class="error__page__container container">

            <h1 v-if="props.error.statusCode === 404" class="gradient-font">
                {{ $t('error.title_404') }}
            </h1>
            <h1 v-else class="gradient-font">
                {{ $t('error.title_generic') }}
            </h1>
            <h2 v-if="props.error.statusCode === 404" class="small-title">
                {{ $t('error.subtitle_404') }}
            </h2>
            <h2 v-else-if="props.error.statusMessage" class="small-title">
                {{ $t('error.subtitle_generic') }}
            </h2>
            <p>
                {{ $t('error.description') }}
            </p>
            <AppButton 
                class="primary" 
                :aria-label="$t('error.button')" 
                @click="handleError" 
            >{{ $t('error.button') }}</AppButton>
        </div>
    </section>
</template>

<script setup>
import { clearError, useHead, useI18n, computed } from '#imports'

const { t } = useI18n()

const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })

const pageTitle = computed(() =>
    `${t(props.error?.statusCode === 404 ? 'error.title_404' : 'error.title_generic')} | Carlos Neto`
)

useHead({
    title: pageTitle,
    meta: [
        { name: 'robots', content: 'noindex' }
    ]
})

</script>

<style lang="scss" scoped>
.error__page{
    position: relative;
    display: grid;
    place-items: center;
    min-height:100vh;
    min-height: 100dvh;
    position: relative;
        // &:before{
        //     content: '';
        //     background: var(--tertiary);
        //     position: absolute;
        //     opacity: 0.4;
        //     top: 0%;
        //     left: 16%;
        //     width: 50%;
        //     height: 80%;
        //     border-radius: 100%;
        //     filter: blur(100px);
        //     box-shadow:  280px 20px 0 0 var(--primary), 80px 280px 0 0 var(--secondary);
        //     z-index: -1;
        // }
    &__container{
        text-align: center;
        img{
            max-width: 120px;
            @media(max-width: $br_mobile){
                max-width: 100px;
            }
        }
        h1{
            animation: shake 0.4s ease infinite;
            font-size: $size_80px;
            margin-block: 16px;
            @media(max-width: $br_mobile){
                font-size: $size_60px;
            }
        }
        p{
            color: var(--text_color_smooth);
            margin-block: 20px;
        }
        button{
            margin: 40px auto;
        }
    }
}
</style>