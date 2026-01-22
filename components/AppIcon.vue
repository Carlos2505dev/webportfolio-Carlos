<template>
    <i>
        <Icon :name="props.IconName" />
    </i>
</template>

<script setup>
const props = defineProps({
    IconName: {
        type: String,
        default: 'ph:caret-right'
    }
})
</script>

<style lang="scss" scoped>
    i{
        display: grid;
        place-items: center;
    }
</style>