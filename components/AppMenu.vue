<template>
    <ul class="menu__list">
        <li 
            v-for="item in menuItems" 
            :key="item.title"
            class="menu__list__item" 
        >
            <nuxt-link 
                class="menu__list__item__link" 
                :class="{ 'active' : sectionVisible == $t(item.route) }" 
                :to="{ path: '/', hash: $t(item.route)}"
            >
                <AppIcon :IconName="item.icon" />
                <span>{{ $t(item.title) }}</span>
            </nuxt-link>
        </li>
    </ul>
</template>

<script setup>
import { ref, reactive, onMounted } from '#imports'

const sectionVisible = ref('')

onMounted(() => {
    document.addEventListener('scroll', () => {
        const home = document.querySelector('#home')
        const portfolio = document.querySelector('#portfolio')
        const about = document.querySelector('#about')
        const services = document.querySelector('#services')
        const contact = document.querySelector('#contact')
        if(window.scrollY <= home.offsetTop + home.offsetHeight / 2){
            sectionVisible.value = '#home'
           
        }else if(window.scrollY <= portfolio.offsetTop + portfolio.offsetHeight / 2){
            sectionVisible.value = '#portfolio'
           
        }else if(window.scrollY <= about.offsetTop + about.offsetHeight / 2){
            sectionVisible.value = '#about'
           
        }else if(window.scrollY <= services.offsetTop + services.offsetHeight / 2){
            sectionVisible.value = '#services'
           
        }else if(window.scrollY <= contact.offsetTop + contact.offsetHeight / 2){
            sectionVisible.value = '#contact'
           
        }
    })
})


const menuItems = reactive([
    {
        icon: 'carlos-icon:home',
        title: 'menu.item1.title', 
        route: 'menu.item1.route'
    },
    {
        icon: 'carlos-icon:portfolio',
        title: 'menu.item2.title', 
        route: 'menu.item2.route'
    },
    {
        icon: 'carlos-icon:about',
        title: 'menu.item3.title', 
        route: 'menu.item3.route'
    },
    {
        icon: 'carlos-icon:services',
        title: 'menu.item4.title', 
        route: 'menu.item4.route'
    },
    {
        icon: 'carlos-icon:logo-symbol',
        title: 'menu.item5.title', 
        route: 'menu.item5.route'
    }
]
)
</script>

<style lang="scss" scoped>
    .menu__list{
        display: flex;
        gap: 40px;
        height: 100%;
        @media(max-width: $br_mobile){
            background-color: var(--bg_color);
            border-top: 1px solid var(--text_color_transparent);
            padding-bottom: 16px;
            padding-inline: 16px;
            gap: 4px;
            width: 100%;
        }
        &__item{
            flex-grow: 1;
            height: 100%;
            &__link{
                // padding: 8px 16px;
                display: block;
                font-size: 12px;
                font-weight: 400;
                font-family: $font_primary;
                color: var(--text_color_smooth);
                display: grid;
                place-items: center;
                cursor: pointer;
                position: relative;
                height: 100%;
                @media(max-width: $br_mobile){
                    font-size: $size_8px;
                    padding:12px 8px 0 8px;
                    border-radius: 40px;
                }
                i{
                    font-size: $size_24px;
                    display: none;
                    @media(max-width: $br_mobile){
                        display: flex;
                        justify-content: center;
                    }
                    @media(max-width: $br_smaller){
                        padding-bottom: 12px;
                        min-width: 28px;
                    }
                }
                
                span{
                    padding-block: 8px;
                    @media(max-width: $br_mobile){
                        padding-block: 8px 12px;
                    }
                    @media(max-width: $br_smaller){
                        display: none;
                    }
                }
                &:after{
                    content: "";
                    width: 0%;
                    height: 2px;
                    background-color: var(--primary);
                    transition: $transition_default;
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin-inline: auto;
                    @media(max-width: $br_mobile) {
                        bottom: inherit;
                        top: 0;
                    }
                }
                @media(min-width: $br_desktop){

                    &:hover{
                        color: var(--text_color);
                        &::after{
                            width: 28px;
                        }
                    }
                }
                &.active{
                    color: var(--text_color);
                    &::after{
                        width: 28px;
                    }
                }
            }
                        &:last-child {
                            i {
                                background-color: var(--primary);
                                padding: 4px;
                                border-radius: 50%;
                                font-size: $size_16px;
                            }
                        }
        }
        
    }
</style>