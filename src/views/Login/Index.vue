<script setup lang="ts">
import LoginBanner from '@/assets/images/Login/login-banner.png'
import Logo from '@/assets/icons/Logo/Index.vue'
import FormLogin from "@/components/pages/Login/FormLogin.vue";

</script>

<template>
    <main class="container">
        <section class="container_body">
            <Logo />
            <article>
                <div>
                    <h1>Faça login agora</h1>
                    <p>Olá, bem-vindo de volta 👋</p>
                </div>
            </article>
            <FormLogin />
        </section>
        <section class="container_image">
            <img :src="LoginBanner" alt="Banner Login">
        </section>
    </main>
</template>

<style lang="scss" scoped>

.container {
    display: block;

    @media (min-width: $xl) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 4rem 4rem;
    }

    @media (min-width: $xl2) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 10rem 20rem;
    }

    &_body {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 3rem;

        @media (min-width: $xl) {
            padding: 0;
        }
    }

    &_image {
        display: none;

        @media (min-width: $xl)  {
            display: block;
        }
    }
}
</style>