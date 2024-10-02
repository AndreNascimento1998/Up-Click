<script lang="ts" setup>
import Logo from '@/assets/icons/Logo/Index.vue'
import Dropdown from "@/components/base/Dropdown/Dropdown.vue";

const optionsDropdown = [
    {
        name: 'The Action 1st',
        action: () => console.log('The Action 1st')
    },
    {
        name: 'Sair',
        action: () => logout()
    }
]

const logout = () => {
    console.log('Logout')
}

</script>

<template>
    <main class="container-header">
        <Logo />
        <article class="container-header_">
            <Dropdown text="juka" rounded :options="optionsDropdown" />
        </article>
    </main>
</template>

<style lang="scss" scoped>
.container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $bg-secondary;
    padding: 1rem;

    @media (min-width: $xl) {
        padding: 2rem 10rem;
    }
}
</style>