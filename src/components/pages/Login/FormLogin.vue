<script setup lang="ts">
import {computed, ref} from 'vue'
import {ElForm, ElNotification} from 'element-plus'
import Input from "@/components/base/Inputs/Input.vue"
import Button from "@/components/base/Button/Button.vue"
import useValidation from "@/composables/useValidation.ts"
import router from "@/router/Index.ts"
import { AuthStore } from "@/stores/AuthStore"
import {GlobalStore} from "@/stores/useGlobalStore.ts";

const useGlobalStore = GlobalStore()

interface FormData {
    email: string
    password: string
}

const useAuthStore = AuthStore()

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const formData = ref<FormData>({
    email: '',
    password: '',
})

const { email, password } = useValidation

const rules = computed(() => ({
    email: email,
    password: password
}))

const loading = computed(() => useGlobalStore.loading)

const sendLogin = () => {
    formRef.value?.validate( (valid) => {
        if (valid) {
            useAuthStore.singAuth(formData.value.email, formData.value.password).then(() => {
                if (useAuthStore.user) {
                    ElNotification({
                        title: 'Sucesso',
                        message: 'Login efetuado com sucesso',
                        type: 'success'
                    })
                    router.push({name: 'Home'})
                } else {
                    ElNotification({
                        title: 'Erro',
                        message: 'Usuário ou senha inválidos',
                        type: 'error'
                    })
                }
            })
        }
    })
}

</script>

<template>
    <el-form :model="formData" :rules="rules as any" ref="formRef">
        <main class="container-form-login">
            <article>
                <Input
                    v-model="formData.email"
                    prop="email"
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    :disabled="loading"
                />
            </article>

            <article class="container-form-login_input-password">
                <Input
                    v-model="formData.password"
                    prop="password"
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    :disabled="loading"
                />
                <span
                    @click="$router.push({name: 'PasswordRecover'})"
                    class="container-form-login_input-password_text"
                >
                    Esqueceu sua senha?
                </span>
            </article>

            <article style="width: 100%">
                <Button
                    @click="sendLogin"
                    text="Entrar"
                    :disabled="loading"
                />
            </article>
        </main>
    </el-form>
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
        width: 100%;
        margin-bottom: 2rem;

        &_text {
            color: $title-color;
            font-weight: bold;
            font-size: 16px;
            font-style: italic;
            cursor: pointer;

            &:hover {
                color: $blue-alternative;
            }
        }
    }
}
</style>
