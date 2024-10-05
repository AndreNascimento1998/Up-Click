import {defineStore} from "pinia"
import {ref} from "vue"

export const GlobalStore = defineStore('global', () => {
    let loading = ref<boolean>(false)

    return {
        loading
    }
})