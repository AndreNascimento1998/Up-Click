<script setup lang="ts">
import {computed, ref} from "vue"
import {ElForm, ElNotification} from "element-plus"
import useValidation from "@/composables/useValidation.ts"
import Input from "@/components/base/Inputs/Input.vue"
import Button from "@/components/base/Button/Button.vue"
import {AuthStore} from "@/stores/AuthStore.ts"
import LoginBanner from '@/assets/images/Login/password-recover-banner.png'
import Logo from "@/assets/icons/Logo/Index.vue"
import {GlobalStore} from "@/stores/useGlobalStore.ts";

const useGlobalStore = GlobalStore()

interface FormData {
    email: string
}

const useAuthStore = AuthStore()

const formData = ref<FormData>({
    email: '',
})

const { email } = useValidation

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const rules = computed(() => ({
    email: email
}))

const loading = computed(() => useGlobalStore.loading)

const recoverPassword = async () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            useAuthStore.resetPassword(formData.value.email).then(() => {
                ElNotification({
                    title: 'Sucesso',
                    message: 'E-mail enviado com sucesso',
                    type: 'success'
                })
            }).catch(() => {
                ElNotification({
                    title: 'Erro',
                    message: 'Erro ao enviar e-mail',
                    type: 'error'
                })
            })
        } else {
            console.log('Erro ao validar o formulário')
        }
    })
}

</script>

<template>
    {{useGlobalStore.loading}}
    <el-form :model="formData" :rules="rules" ref="formRef">
    <main class="container-recover-password">
        <section class="container-recover-password_section">
            <Logo style="padding-top: 16px" />
            <div class="container-recover-password_section_title">
                <h1>Recuperar senha</h1>
                <span>Informe seu e-mail para recuperar a senha</span>
            </div>
            <article class="container-recover-password_section_input">
                <Input
                    v-model="formData.email"
                    prop="email"
                    label="E-mail"
                    :disabled="loading"
                    placeholder="Digite seu e-mail para recuperar a senha"
                />
                <Button
                    @click="recoverPassword"
                    :disabled="loading"
                    text="Enviar"
                />
                <Button
                    @click="$router.push({name: 'Login'})"
                    :disabled="loading"
                    outlined
                    text="Voltar para o login"
                />
            </article>
        </section>
        <section class="container-recover-password_img" style="overflow: hidden">
            <img :src="LoginBanner" alt="Banner Login" />
        </section>
    </main>
    </el-form>
</template>

<style lang="scss" scoped>
.container-recover-password {
    display: flex;
    justify-content: center;
    padding: 1rem;

    @media (min-width: $xl) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 10rem 0 0 0;
    }

    &_section {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        width: 100%;

        @media (min-width: $xl) {
            width: 50%;
            padding: 0 0 0 20rem;
        }

        &_title {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        &_input {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
    }

    &_img {
        display: none;

        @media (min-width: $xl) {
            display: block;
        }
    }
}
</style>