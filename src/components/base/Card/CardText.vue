<script lang="ts" setup>

import {ref} from "vue";
import ChevronDown from "@/assets/icons/Outhers/ChevronDown.vue";
import ChevronUp from "@/assets/icons/Outhers/ChevronUp.vue";

const props = defineProps<{
    text: string
    color?: string
    dropdown?: boolean
}>()

const open = ref(false)

</script>

<template>
    <main
        class="container-cart-text"
        @click="open = !open"
        :class="{
            'color-text-white': props.color === 'green',
            'cursor-pointer': props.dropdown
        }"
    >
        <article
            class="container-cart-text_circle-yellow"
            :class="{'container-cart-text_circle-green': props.color === 'green' }"
        />
        <article>{{ props.text }}</article>

        <ChevronDown v-if="props.dropdown && !open" />
        <ChevronUp v-else-if="props.dropdown && open" />

        <section
            v-if="props.dropdown"
            class="container-cart-text_list"
            :class="{'container-cart-text_active': open, 'container-cart-text_inactive': !open}"
        >
            <slot />
        </section>
    </main>
</template>

<style lang="scss" scoped>
.container-cart-text {
    position: relative;
    display: flex;
    font-size: 16px;
    align-items: center;
    background-color: $bg-card-secondary;
    width: fit-content;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 8px;
    gap: 8px;

    &_circle-yellow {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        width: 16px;
        height: 16px;
        background-color: black;
        border-radius: 50%;
        border: 2px solid white;
    }

    &_circle-green {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        border: 2px solid black;
    }

    &_list {
        position: absolute;
        background-color: #e6e6e6;
        padding: 12px 12px;
        width: 89%;
        color: $title-color;
        font-size: 16px;
        z-index: 20;
        gap: 1rem;
        left: 0;
        border-radius: 8px;
        top: 110%;
    }

    &_active {
        animation: fadeIn 0.5s forwards;
    }

    &_inactive {
        animation: fadeOut 0.5s forwards;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.color-text-white {
    background-color: $bg-card-text;
    color: white;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
        display: none;
    }
}
</style>