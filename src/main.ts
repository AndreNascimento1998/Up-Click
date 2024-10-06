import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/Index.ts"
import {createPinia} from "pinia"
import ptBr from 'element-plus/es/locale/lang/pt-br'
import './firebaseConfig'
import {AuthStore} from "@/stores/AuthStore.ts"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from '@/firebaseConfig.ts'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus, {
    locale: ptBr
})

const useAuthStore = AuthStore()

onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
        useAuthStore.user = authUser
    }
})

app.use(router)
app.mount('#app')
