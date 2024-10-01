<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, FormRules } from 'element-plus'
import Input from "@/components/base/Inputs/Input.vue";
import Button from "@/components/base/Button/Button.vue";

interface FormData {
    email: string;
    password: string;
}

const formData = ref<FormData>({
    email: '',
    password: ''
})

const rules = ref<FormRules>({
    email: [
        { required: true, message: 'O e-mail é obrigatório', trigger: 'blur' },
        { type: 'email', message: 'Por favor insira um e-mail válido', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: 'A senha é obrigatória', trigger: 'blur' },
        { min: 8, message: 'A senha deve ter no mínimo 8 caracteres', trigger: 'blur' }
    ]
})

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const onSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
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
                <Button text="Entrar" @click="onSubmit" />
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

        &_text {
            color: $title-color;
            font-weight: bold;
            font-style: italic;
            cursor: pointer;
        }
    }
}
</style>
