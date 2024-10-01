<script setup lang="ts">
import {computed, ref} from 'vue'
import { ElForm, FormRules } from 'element-plus'
import Input from "@/components/base/Inputs/Input.vue";
import Button from "@/components/base/Button/Button.vue";
import useValidation from "@/composables/useValidation.ts";
import router from "@/router/Index.ts";

interface FormData {
    email: string;
    password: string;
}

const formData = ref<FormData>({
    email: '',
    password: '',
})

const { email, password } = useValidation

const rules = computed(() => ({
    email: email,
    password: password
}))

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const sendLogin = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            router.push({ name: 'Home'} )
            console.log('Formulário enviado com sucesso', formData.value)
        } else {
            console.log('Erro ao validar o formulário')
            return false
        }
    })
}
</script>

<template>
    <el-form :model="formData" :rules="rules" ref="formRef">
        <main class="container-form-login">
            <article>
                <Input v-model="formData.email" prop="email" label="E-mail" placeholder="Digite seu e-mail" />
            </article>

            <article class="container-form-login_input-password">
                <Input v-model="formData.password" prop="password" label="Senha" type="password" placeholder="Digite sua senha" />
                <span class="container-form-login_input-password_text">Esqueceu sua senha?</span>
            </article>

            <article style="width: 100%">
                <Button text="Entrar" @click="sendLogin" />
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
