<script setup lang="ts">
import Input from "@/components/base/Inputs/Input.vue";
import {ref} from "vue";
import Button from "@/components/base/Button/Button.vue";

const formData = ref({
    email: '',
    password: ''
})
</script>

<template>
    <main class="container-form-login">
        <article>
            <Input v-model="formData.email" label="E-mail" placeholder="Digite seu e-mail" />
        </article>
        <article class="container-form-login_input-password">
            <Input v-model="formData.password" label="Senha" type="password" placeholder="Digite sua senha" />
            <span class="container-form-login_input-password_text">Esqueceu sua senha?</span>
        </article>
        <article style="width: 100%">
            <Button text="Entrar" />
        </article>
    </main>
</template>

<style scoped lang="scss">
    .container-form-login {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media (min-width: $xl) {
            width: 80%;
        }

        &_input-password {
            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 4px;

            &_text {
                color: $title-color;
                font-weight: bold;
                font-style: italic;
                cursor: pointer;
            }
        }
    }
</style>