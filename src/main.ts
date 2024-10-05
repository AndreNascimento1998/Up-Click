import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/Index.ts"
import {createPinia} from "pinia"
import ptBr from 'element-plus/es/locale/lang/pt-br'
import './firebaseConfig'


const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus, {
    locale: ptBr
})
app.use(router)
app.mount('#app')
