<script lang="ts" setup>
import Logo from '@/assets/icons/Logo/Index.vue'
import Dropdown from "@/components/base/Dropdown/Dropdown.vue";
import { AuthStore } from "@/stores/AuthStore"
import router from "@/router/Index.ts";

const useAuthStore = AuthStore()

const optionsDropdown = [
    {
        name: 'Sair',
        action: () => logout()
    }
]

const logout = async () => {
    await useAuthStore.logout()
    router.push({ name: 'Login' })
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