<template>
    <nuxt-link 
        v-if="hasLink" 
        :to="hasLink" 
        class="button" 
    >
        <slot />
    </nuxt-link>
    <button v-else class="button">
        <slot />
    </button>
</template>

<script setup>
import { toRefs } from '#imports'
const props = defineProps({
    hasLink: {
        type: String
    }
})

const { hasLink } = toRefs(props)
</script>

<style lang="scss" >
.button{
    border: 2px solid var(--text_color_transparent);
    background-color: var(--bg_color_transparent);
    backdrop-filter: blur(4px);
    border-radius: 12px;
    padding: 12px 20px;
    font-size: $size_16px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text_color);
    font-weight: 500;
    cursor: pointer;
    gap: 8px;
    transition: $transition_default;
    width: fit-content;
    font-family: $font_secondary;
    &.lg{
        font-size: $size_20px;
        padding: 20px 32px;
    }
    &:focus{
        outline: transparent;
    }
    &.icononly{
        width: 32px;
        aspect-ratio: 1;
        padding: 4px;
        border-radius: 36px;
        font-size: $size_16px;
        &:hover{
            transform: scale(1.12);
        }
    }

    &.call{
        i{
            transition: $transition_default;
        }
        &:hover{
            i{
                animation: calling 2s infinite;
            }
        }
    }
    
    &.outline{
        background-color: transparent;
        border-color: var(--text_color_transparent);
        color: var(--text_color);
        border: 2px solid var(--text_color_transparent);
        box-shadow: 0 8px 0px 0 var(--text_color_transparent);
        &:hover{
            background-color: var(--text_color);
            color: var(--bg_color);
            box-shadow: 0 4px 0px 0 var(--text_color_transparent);
            transform: translateY(8px);
        }
        &.inverted{
            border-color: var(--bg_color_transparent);
            color: var(--bg_color);
            &:hover{
                background-color: var(--bg_color);
                color: var(--text_color);
                border-color: var(--bg_color);
            }
        }
    }
    &.primary{
        background: var(--bg_color);
        border: 2px solid var(--text_color);
        box-shadow: 0 8px 0px 0 var(--text_color);
        color: var(--text_color);
        text-transform: uppercase;
        &:hover,&:focus{
            border-color: var(--text_color);
            box-shadow: 0 4px 0px 0 var(--text_color);
            transform: translateY(8px);
            // background-color: var(--primary);
        }
        &:active{
            box-shadow: 0 4px 0px 0 var(--primary);
            border-color: var(--primary);
            transform: translateY(8px);
        }
    }
    &.secondary{
        background: var(--text_color);
        color: var(--bg_color);
        border: none;
        &:hover{
            background: var(--tertiary);
            color: var(--pure_white);
        }
    }
    &.small{
        padding: 12px 16px;
        font-size: $size_14px;
        width: fit-content;
        @media(max-width:$br_mobile){
            font-size: $size_16px;
            padding: 16px 20px;
        }
    }
    &.link{
        padding-inline: 0;
        border: none;
        background-color: transparent;
        color: var(--secondary);
        &:hover{
            text-decoration: underline;
        }
    }
    &.full-width{
        width: 100%;
    }

    @keyframes calling {
        0%{
            transform: translateY(-8px);
            opacity: 1;
        }
        60%{
            transform: translateY(4px);
            opacity: 1;
        }
        95%{
            transform: translateY(12px);
            opacity: 0;
        }
        100%{
            transform: translateY(-8px);
            opacity: 0;
        }
    }
}
</style>