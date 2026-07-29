<template>
    <AppModal class="modal__project" :openedModal="openedModal" @close:modal="closeModal">
        <ProjectDetailContent v-if="projectDetails" :project="projectDetails" />
    </AppModal>
</template>

<script setup>
import { toRefs } from '#imports'

const props = defineProps({
    projectDetails: {
        type: Object,
        required: true
    },
    openedModal: {
        type: Boolean,
        default: false
    }
})

const { projectDetails, openedModal } = toRefs(props)

const emits = defineEmits(['close:modal'])
function closeModal(){
    emits('close:modal')
}
</script>

<style lang="scss" scoped>
.modal__project{
    :deep(.project-detail) {
        grid-template-columns: 440px 1fr;
        @media(max-width: $br_mobile) {
            grid-template-columns: 1fr;
        }
    }
    :deep(.project-detail__gallery) {
        max-height: 100vh;
        overflow: auto;
    }
}
</style>
