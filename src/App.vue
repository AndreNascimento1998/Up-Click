<script setup lang="ts">
import '@/styles/global.scss';
</script>

<template>
    <div class="width-app">
        <router-view />
    </div>
</template>

<style scoped lang="scss">
.width-app {
    max-width: 100%;

    @media (min-width: $xl4) {
        max-width: 2300px;
        margin: auto;
    }
}
</style>
