import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/Index.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/Index.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = getAuth()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    onAuthStateChanged(auth, (user) => {
        if (requiresAuth && !user) {
            next({ name: 'Login' })
        } else {
            next()
        }
    })
})

export default router
