<template>
    <header class="header section"
        :class="[onScroll.scrollTop ? 'show' : 'hide', onScroll.position > 60 ? 'scrolled' : '']">
        <div class="container__fluid">
            <div class="container__fluid__logo">
                <NuxtLink aria-label="Homepage" to="/">
                    <TheLogo />
                </NuxtLink>
            </div>
            <nav class="container__fluid__menu">
                <AppMenu />
            </nav>
            <div class="container__fluid__actions">
                <AppColorSwitcher />
                <AppLangSwitcher />
            </div>
        </div>
    </header>
</template>

<script setup>
import {onMounted, reactive} from '#imports'

const onScroll = reactive({
    scrollTop: true,
    lastScroll: null,
    position: null
})

onMounted(() => {
    onScroll.lastScroll = 0
    document.addEventListener('scroll', () => {
        onScroll.position = window.scrollY.toFixed()
        if (onScroll.position <= 400 ) {
            onScroll.scrollTop = true
        }
        
        if (onScroll.position > onScroll.lastScroll && onScroll.position > 400) {
            onScroll.scrollTop = false
        } else if (
            onScroll.position < onScroll.lastScroll || onScroll.position < 400
        ) {
            onScroll.scrollTop = true
        }
        onScroll.lastScroll = onScroll.position

    })
})
</script>

<style lang="scss" scoped>
    .header{
        position: fixed;
        min-height: 100px;
        padding-block: 24px;
        display: flex;
        width: 100%;
        justify-content: center;
        transition: all 1s ease-in-out;
        z-index: 999;
        top: 0;
        &.hide{
            top: -100%;
        }
        &.show{
            top: 0;
        }
        &.scrolled{
            
            .container__fluid {
                max-width: 980px;
                background-color: var(--bg_color);
                border: 1px solid var(--text_color_transparent);
                &__logo, &__actions{
                    padding: 8px;
                }
            }
        }
        .container__fluid{
            transition: $transition_default;
            display: grid;
            grid-template-columns: repeat(3,1fr);
            align-items: center;
            border: 1px solid transparent;
            border-radius: 12px;
            position: relative;
            @media(max-width: $br_mobile){
                display: flex;
                justify-content: space-between;
                
            }
            &__logo{
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
            }
            &__menu{
                display: grid;
                place-items: center;
                height: 100%;
                @media(max-width: $br_mobile){
                    height: auto;
                }
                @media(max-width: $br_mobile){
                    position: fixed;
                    z-index: 999;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    transition: $transition_default;
                }
            }
            &__actions{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                grid-gap: 16px;
            }
        }
    }
</style>