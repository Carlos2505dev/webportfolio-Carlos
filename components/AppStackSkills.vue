<template>
    <ul v-if="!small" class="skills__stacks">
        <li v-for="stack in stackList" :key="stack.name" class="skills__stacks__item">
            <strong>{{ stack.name }}</strong>
            <AppIcon :IconName="stack.logo" />
        </li>
        <li v-if="maxItems && stacks.length > maxItems" class="skills__stacks__button">
            <AppButton :aria-label="stackList.length > maxItems ? 'Less' : 'More'" class="secondary icononly"
                :class="stackList.length > maxItems ? 'opened' : ''" @click="showAll">
                <AppIcon IconName="ph:plus-bold" />
                <span v-if="stackList.length == maxItems">
                    {{ stacks.length - maxItems }}
                </span>
                <span class="visually-hidden">
                    {{ stackList.length > maxItems ? 'Less' : 'More' }}
                </span>
            </AppButton>
        </li>
    </ul>
    <ul v-else class="skills__stacks small">
        <li v-for="stack in stackList" :key="stack.name" class="skills__stacks__item">
            <strong>{{ stack.name }}</strong>
            <AppIcon :IconName="stack.logo" />
        </li>
        <li v-if="maxItems && stacks.length > maxItems" class="skills__stacks__button">
            <AppButton 
                :aria-label="stackList.length > maxItems ? 'Less' : 'More'" 
                class="secondary icononly"
                :class="stackList.length > maxItems ? 'opened' : ''" @click="showAll"
            >
                <AppIcon IconName="ph:plus-bold" />
                <span v-if="stackList.length == maxItems">
                    {{ stacks.length - maxItems }}
                </span>
                <span class="visually-hidden">
                    {{ stackList.length > maxItems ? 'Less' : 'More' }}
                </span>
            </AppButton>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted, watch } from '#imports'
const props = defineProps({
    stacks: {
        type: Object
    },
    maxItems: {
        type: Number,
        required: false
    },
    small: {
        type: Boolean
    }
})

let stackList = ref(props.stacks)

watch(() => props.stacks, (newVal) => {
    if (props.maxItems != null) {
        stackList.value = newVal.slice(0, props.maxItems)
    } else {
        stackList.value = newVal
    }
})
onMounted(() => {
    if(props.maxItems != null){
        stackList.value = props.stacks.slice(0, props.maxItems)
    }else{
        stackList.value = props.stacks
    }
})

function showAll(){
    if(stackList.value.length == props.maxItems){
        stackList.value = props.stacks
    }else{
        stackList.value = props.stacks.slice(0, props.maxItems)
    }
}

</script>

<style lang="scss" scoped>
    .skills__stacks{
        display: flex;
        // margin: auto;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        &.small{
            gap: 0;
            .skills__stacks__item{
                background-color: var(--bg_color);
                border-radius: 50%;
                width: 40px;
                font-size: $size_20px;
                margin-left: -12px;
                box-shadow: none;
                border-color: var(--text_color_transparent)
            }
        }
        &__item{
            aspect-ratio: 1;
            font-size: $size_40px;
            width: 80px;
            display: grid;
            place-items: center;
            transition: $transition_default;
            border-radius: 20px;
            background-color: var(--text_color_transparent);
            border: 1px solid var(--text_color_transparent);
            color: var(--text_color);
            box-shadow: 0 4px 20px 0 var(--text_color_transparent), inset 8px -12px 32px 0 var(--bg_color);
            &.no-bg{
                background-color: transparent;
                box-shadow: none;
                width: fit-content;
                margin-left: 0; 
            }
            &:first-child{
                margin-left: 0;
            }
            strong{
                background-color: var(--text_color);
                color: var(--bg_color);
                font-size: $size_8px;
                font-weight: normal;
                padding: 4px 8px;
                border-radius: $size_8px;
                position: absolute;
                top: 0;
                transition: $transition_default;
                opacity: 0;
                text-transform: uppercase;
                text-align: center;
                white-space: nowrap;
            }
            &:hover{
                z-index: 1;
                transform: scale(1.2);
                strong{
                    top: -28px;
                    opacity: 1;
                }
            }
        }
        &__button{
            position: relative;
            
            button{
                transition: $transition_default;
                margin-left: -12px;
                gap: 0px;
                i{
                    font-size: $size_14px;
                }
                &.opened{
                    transform: rotate(45deg);
                }
                span{
                    font-size: $size_12px;
                }
            }
        }
    }
</style>