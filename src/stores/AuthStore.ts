import {defineStore} from "pinia"
import {ref} from "vue"
import {signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth"
import { auth } from '@/firebaseConfig.ts'

export const AuthStore = defineStore('auth', () => {
    const user = ref()

    async function singAuth(email: string, password: string) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            user.value = response.user
        } catch (e) {
           console.log(e)
        }
    }

    async function logout() {
        try {
            await signOut(auth)
            user.value = null
        } catch (e) {
            console.error(e)
        }
    }

    async function resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (e) {
            console.error(e)
        }
    }


    return {
        user,
        singAuth,
        logout,
        resetPassword
    }
})