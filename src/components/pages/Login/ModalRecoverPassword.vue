<script setup lang="ts">
import Modal from "@/components/base/Modal/Modal.vue";
import {computed, ref} from "vue";
import {ElForm, ElNotification} from "element-plus";
import useValidation from "@/composables/useValidation.ts";
import Input from "@/components/base/Inputs/Input.vue";
import Button from "@/components/base/Button/Button.vue";
import {AuthStore} from "@/stores/AuthStore.ts";

interface FormData {
    email: string;
}

const useAuthStore = AuthStore()

const openModal = ref(false)

const formData = ref<FormData>({
    email: '',
})

const { email } = useValidation

const rules = computed(() => ({
    email: email
}))

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const emit = defineEmits(['update:modelValue'])

const handleClick = () => {
    emit('update:modelValue', false)
}

const recoverPassword = async () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            useAuthStore.resetPassword(formData.value.email).then(() => {
                openModal.value = false
                ElNotification({
                    title: 'Sucesso',
                    message: 'E-mail enviado com sucesso',
                    type: 'success'
                })
            })
        } else {
            console.log('Erro ao validar o formulário')
        }
    })
}

</script>

<template>
    <Modal
        v-model="openModal"
        title="Recuperar senha"
        @update:modelValue="handleClick"
    >
        <el-form :model="formData" :rules="rules" ref="formRef">
            <main class="container-recover-password">
                <article style="width: 400px">
                    <Input
                        v-model="formData.email"
                        prop="email"
                        label="E-mail"
                        placeholder="Digite seu e-mail para recuperar a senha"
                    />
                </article>
                <Button
                    @click="recoverPassword"
                    style="width: 200px"
                    text="Salvar"
                />
            </main>
        </el-form>
    </Modal>
</template>

<style lang="scss" scoped>
.container-recover-password {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
}
</style>