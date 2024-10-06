import {defineStore} from "pinia"
import {ref} from "vue"
import {signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth"
import { auth } from '@/firebaseConfig.ts'
import {GlobalStore} from "@/stores/useGlobalStore.ts";

export const AuthStore = defineStore('auth', () => {
    const user = ref()
    const useGlobalStore = GlobalStore()

    async function singAuth(email: string, password: string) {
        useGlobalStore.loading = true
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            user.value = response.user
        } catch (e) {
           console.log(e)
        } finally {
            useGlobalStore.loading = false
        }
    }

    async function logout() {
        useGlobalStore.loading = true
        try {
            await signOut(auth)
            user.value = null
        } catch (e) {
            console.error(e)
        } finally {
            useGlobalStore.loading = false
        }
    }

    async function resetPassword(email: string) {
        useGlobalStore.loading = true
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (e) {
            console.error(e)
        } finally {
            useGlobalStore.loading = false
        }
    }


    return {
        user,
        singAuth,
        logout,
        resetPassword
    }
})