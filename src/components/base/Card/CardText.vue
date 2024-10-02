<script lang="ts" setup>

const props = defineProps<{
    text: string
    color?: string
}>()


</script>

<template>
    <main
        class="container-cart-text"
        :class="{'color-text-white': props.color === 'green'}"
    >
        <article
            class="container-cart-text_circle-yellow"
            :class="{'container-cart-text_circle-green': props.color === 'green' }"
        />
        <article>{{ props.text }}</article>
    </main>
</template>

<style lang="scss" scoped>
.container-cart-text {
    display: flex;
    align-items: center;
    background-color: $bg-card-secondary;
    width: fit-content;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 8px;
    gap: 8px;

    &_circle-yellow {
        width: 16px;
        height: 16px;
        background-color: black;
        border-radius: 50%;
        border: 2px solid white;
    }

    &_circle-green {
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        border: 2px solid black;
    }
}

.color-text-white {
    background-color: $bg-card-text;
    color: white;
}
</style>