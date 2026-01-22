<template>
    <div class="body-container">
        <TheHeader />
        <main>
            <slot />
        </main>
        <TheFooter />
    </div>
</template>



<style scoped lang="scss">
.body-container{
    min-height: 100%;
}
</style>